import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './UpdateCategory.module.css';
import CategoryForm from '../../components/CategoryForm';
import { updateCategory } from '../../ducks/dashboard';

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { category_id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState({});

  const fetchCategory = useCallback(
    async (categoryId) => {
      console.log('Fetching Category');
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'GET',
      });
      if (response.ok) {
        const { data } = await response.json();
        setName(data.category.name);
      }
    },
    [category_id]
  );

  useEffect(() => {
    fetchCategory(category_id);
  }, [category_id, fetchCategory]);

  const handleChange = (event) => setName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateCategory({ name }, category_id, () =>
        history.push('/dashboard/categories')
      )
    );
  };

  return (
    <div className={styles.update__category}>
      <span className={styles.title}>
        Update Category with ID: {category_id}
      </span>
      <CategoryForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={name}
        error={error}
      />
    </div>
  );
};

export default UpdateCategory;
