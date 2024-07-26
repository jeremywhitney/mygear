import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editGearPost, getPostById } from "../services/postService";
import { GearForm } from "./GearForm";
import { DropdownUtility } from "../filter/DropdownUtility";

export const EditGear = ({ currentUser }) => {
  const [initialData, setInitialData] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setInitialData(post);
    });
  }, [postId]);

  const handleUpdatePost = async (updatedPost) => {
    const editedPost = {
      userId: currentUser.id,
      brandId: parseInt(updatedPost.brandId),
      categoryId: parseInt(updatedPost.categoryId),
      conditionId: parseInt(updatedPost.conditionId),
      model: updatedPost.model,
      year: updatedPost.year,
      forSale: updatedPost.forSale,
      description: updatedPost.description,
      image: updatedPost.image,
    };
    return await editGearPost(postId, editedPost).then(() => {
      navigate(`/gear/${postId}`);
    });
  };

  return (
    <DropdownUtility>
      {({ categories, conditions, brands }) =>
        initialData ? (
          <GearForm
            currentUser={currentUser}
            initialData={initialData}
            categories={categories}
            conditions={conditions}
            brands={brands}
            handleSubmit={handleUpdatePost}
          />
        ) : (
          <div>Loading...</div>
        )
      }
    </DropdownUtility>
  );
};
