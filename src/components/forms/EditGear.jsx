import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editGearPost, getPostById } from "../services/postService";
import { GearForm } from "./GearForm";
import { getCategories } from "../services/categoryService";
import { getConditions } from "../services/conditionService";
import { getBrands } from "../services/brandService";

export const EditGear = ({ currentUser }) => {
  const [initialData, setInitialData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setInitialData(post);
    });
  }, [postId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        const fetchedConditions = await getConditions();
        setConditions(fetchedConditions);
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchData();
  }, []);

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

  return initialData ? (
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
  );
};
