import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfile= ({user})=> {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
      };
    
      const handleSaveClick = () => {
        setIsEditing(false);
      };



  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ViewProfile">
      <h2>First Name: {user.first_name}</h2>
      <h2>Last Name: {user.last_name}</h2>
      <img src={user.url} alt={"photo"}/>
      <p>Birthday: {user.dob_month}/{user.dob_day}/{user.dob_year}</p>
      <p>Gender: {user.show_gender ? user.gender_identity : 'Not specified'}</p>
      <p>About me: {user.about}</p>
      
      <button className="secondary-button">Edit</button> 
    </div>
  );
}
// still have to work on the edits

export default ViewProfile;






// import { useState } from 'react';
// import axios from 'axios';

// const ViewProfile= ({user})=> {
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         first_name: user.first_name,
//         last_name: user.last_name,
//         dob_month: user.dob_month,
//         dob_day: user.dob_day,
//         dob_year: user.dob_year,
//         gender_identity: user.gender_identity,
//         about: user.about
//     });
    
//     const handleEditClick = () => {
//         setIsEditing(true);
//     };
    
//     const handleSaveClick = async () => {
//         try {
//             const response = await axios.put('http://localhost:8000/user', {formData});
//             const success = response.status === 200;
//             if (success) {
//                 setIsEditing(false);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="ViewProfile">
//             {isEditing ?
//                 <form onSubmit={handleSaveClick}>
//                     <label>
//                         First Name:
//                         <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
//                     </label>
//                     <label>
//                         Birthday:
//                         <input type="text" name="dob_month" value={formData.dob_month} onChange={handleInputChange} />
//                         <input type="text" name="dob_day" value={formData.dob_day} onChange={handleInputChange} />
//                         <input type="text" name="dob_year" value={formData.dob_year} onChange={handleInputChange} />
//                     </label>
//                     <label>
//                         Gender:
//                         <input type="text" name="gender_identity" value={formData.gender_identity} onChange={handleInputChange} />
//                     </label>
//                     <label>
//                         About me:
//                         <input type="text" name="about" value={formData.about} onChange={handleInputChange} />
//                     </label>
//                     <button type="submit">Save</button>
//                 </form>
//             :
//                 <>
//                     <h2>First Name: {user.first_name}</h2>
//                     <h2>Last Name: {user.last_name}</h2>
//                     <p>Birthday: {user.dob_month}/{user.dob_day}/{user.dob_year}</p>
//                     <p>Gender: {user.show_gender ? user.gender_identity : 'Not specified'}</p>
//                     <p>About me: {user.about}</p>
//                     <button onClick={handleEditClick}>Edit</button>
//                 </>
//             }
//         </div>
//     );
// }

// export default ViewProfile;
