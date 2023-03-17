const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uri = "mongodb+srv://project:project@35lproject.3p5ldxo.mongodb.net/?retryWrites=true&w=majority"
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('hello')
}) 

//signing up to the database
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }
        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })
        res.status(201).json({ token, userId: generatedUserId})
    } catch (err) {
        console.log(err)
    //added this finally
    } finally {
        await client.close()
    }
})

//updating the leaderboard using submit button
app.post('/submitTotal', async (req, res) => {
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        
        const {email, total} = req.body
        const user = await users.findOne({email})
        if (user) {
            const result = await users.updateOne({email}, {$set: {total: parseInt(total)}});
            res.send(result)
        } else {
            res.status(404).send('User not found')
        }
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})


//logging into the database
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
  
    try {
      await client.connect();
      const database = client.db('app-data');
      const users = database.collection('users');
  
      const user = await users.findOne({ email });
  
      const correctPassword = await bcrypt.compare(password, user.hashed_password);
  
      if (user && correctPassword) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24
        });
        return res.status(201).json({ token, userId: user.user_id });
      }
  
      // Moved the following line inside the if block
      // Added a return statement to prevent sending another response
      return res.status(400).send('Invalid Credentials');
  
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  });
  


//get individual user
app.get('/user', async(req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id:userId}
        const user = await users.findOne(query)
        res.send(user)
    } finally {
        await client.close()
    }
})

//get all the users by their user ids in the database
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)
    console.log(userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        console.log(foundUsers)
        res.send(foundUsers)
    } finally {
        await client.close()
    }
})


app.get('/leaderboard', async (req, res) => {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const database = client.db('app-data');
      const users = database.collection('users');
  
      // Find the top 5 users with the highest total scores
      const topUsers = await users.find().sort({total: -1}).limit(5).toArray();
  
      // Create an array of user objects with name, total, and url properties
      const leaderboard = topUsers.map(user => ({
        name: `${user.first_name || ''} ${user.last_name || ''}`,
        total: user.total,
        url: user.url
      }));
  
      // Send the leaderboard as a JSON array in the response
      res.json(leaderboard);
    } catch (err) {
      console.log(err);
    } finally {
      // Close the client connection
      client.close();
    }
  });
  
//getting the genered-users in database
app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {gender_identity: {$eq:gender}}
        const foundUsers = await users.find(query).toArray()
        const allUsers = await users.find().toArray()
        res.json(allUsers)
    } finally {
        await client.close()
    }
})

app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})

//updating a user in the database
app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    console.log(formData)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}
        console.log(query)

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                //took away show gender
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches,
                workout_time: formData.workout_time,
                workout_intensity: formData.workout_intensity,
                favorite_exercise: formData.favorite_exercise,
                goals: formData.goals
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})

//putting workout preferences in database
app.put('/workout', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id} 
        console.log(query)

        const updateDocument = {
            $set: {
                workout_time: formData.workout_time,
                workout_intensity: formData.workout_intensity,
                favorite_exercise: formData.favorite_exercise,
                goals: formData.goals, 
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})

//updating profile if edited in database
app.put('/editProfile', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
  
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id} 
        console.log(query)

        const updateDocument = {}
        if (formData.workout_time !== undefined) {
            updateDocument.workout_time = formData.workout_time
        }
        if (formData.workout_intensity !== undefined) {
            updateDocument.workout_intensity = formData.workout_intensity
        }
        if (formData.favorite_exercise !== undefined) {
            updateDocument.favorite_exercise = formData.favorite_exercise
        }
        if (formData.goals !== undefined) {
            updateDocument.goals = formData.goals
        }
        if (formData.first_name !== undefined) {
            updateDocument.first_name = formData.first_name
        }
        if (formData.last_name !== undefined) {
            updateDocument.last_name = formData.last_name
        }
        if (formData.show_gender !== undefined) {
            updateDocument.show_gender = formData.show_gender
        }
        if (formData.gender_identity !== undefined) {
            updateDocument.gender_identity = formData.gender_identity
        }
        if (formData.gender_interest !== undefined) {
            updateDocument.gender_interest = formData.gender_interest
        }
        if (formData.url !== undefined) {
            updateDocument.url = formData.url
        }
        if (formData.about !== undefined) {
            updateDocument.about = formData.about
        }

        const updatedUser = await users.updateOne(query, { $set: updateDocument })

        res.json(updatedUser)

    } finally {
        await client.close()
    }
})

//update a user with a match
app.put('/addmatch', async(req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id:userId}
        const updateDocument = {
            $push: {matches: {user_id:matchedUserId}},
        }
        const user = await users.updateOne(query,updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

//sending messages between two users
app.get('/messages',async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, correspondingUserId} = req.query
    console.log(userId, correspondingUserId)
    try {
    await client.connect()
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const query = {
        from_userId: userId, to_userId: correspondingUserId
    }
    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages)
} finally {
    await client.close()
}
})

//adding a message to database
app.post('/message', async(req, res) => {
    const client = new MongoClient(uri)
    const message =req.body.message

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally {
        await client.close()
    }
})

app.post('/mile-log', async (req, res) => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('app-data');
      const users = database.collection('users');
  
      const { user_id, date, mile_time } = req.body;
      const user = await users.findOne({ _id: ObjectId(user_id) });
      if (user) {
        const result = await users.updateOne(
          { _id: ObjectId(user_id) },
          { $push: { mile_times: { date, mile_time } } }
        );
        res.send(result);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  });
  


  app.get('/searchTotal', async(req, res) => {
    const client = new MongoClient(uri)
    const email = req.query.email;
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email });
        if (!user) {
            const response = "error"
            res.json(response)
            return
          }
        const total = user.total;
        if (total == undefined) {
            const response = {
                total: "none submitted",
                name: user.first_name,
                url: user.url,
                rank: "?" 
            };
            res.json(response);
        } else {
            const rank = await users.countDocuments({ total: { $gt: total } }) + 1;
            const response = {
                total: user.total,
                name: user.first_name,
                url: user.url,
                rank: rank 
            };
            res.json(response);
        }
     
    } finally {
        await client.close()
    }
})




app.listen(PORT, () => console.log('Server running on PORT ' + PORT)) 


