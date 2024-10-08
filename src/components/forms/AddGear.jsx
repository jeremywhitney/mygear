import { useNavigate } from "react-router-dom";
import { createGearPost } from "../services/postService";
import { GearForm } from "./GearForm";
import { DropdownUtility } from "../utilities/DropdownUtility.jsx";

export const AddGear = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const newPost = await createGearPost(formData);
      navigate(`/gear/${newPost.id}`);
    } catch (error) {
      console.error("Errror adding gear:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center my-4">Add Gear to Collection</h1>
      <DropdownUtility>
        {({ categories, conditions, brands }) => (
          <GearForm
            handleSubmit={handleSubmit}
            currentUser={currentUser}
            categories={categories}
            conditions={conditions}
            brands={brands}
          />
        )}
      </DropdownUtility>
    </div>
  );
};
