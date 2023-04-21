import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import Categories from '../../components/site/Categories/Categories';
import ListCard from '../../components/site/ListCard/ListCard';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(apiUrl(`category-single/${id}`))
        .then((res) => {
          setActiveCategory(res.data);
        })
        .catch((err) => {});
    }
  }, [id]);

  return (
    <div class="container">
      <Categories activeCategory={activeCategory?.id} setActiveCategory={setActiveCategory} noDefault />
      <ListCard category={activeCategory?.id} title={activeCategory ? activeCategory?.name : 'Последние товары'} />
    </div>
  );
};

export default CategoryPage;
