import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import styles from './CreateProduct.module.css';
import Dropzone from '../../components/Dropzone';
import ImageList from '../../components/ImageList';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { fetchCategories, createProduct } from '../../ducks/dashboard';

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories.items);

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChange = (fn) => (event) => fn(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => formData.append(index, image));
    dispatch(
      createProduct(
        { category_id: category.value, name, description, price },
        formData
      )
    );
  };

  const onDrop = useCallback((files) => {
    console.log('Files', files);
    setImages((prevState) => [...prevState, ...files]);
  }, []);

  return (
    <div className={styles.create__product}>
      <div className={styles.form__container}>
        <Select
          value={category}
          onChange={setCategory}
          placeholder='Categories'
          options={
            categories &&
            categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))
          }
        />
        <form onSubmit={handleSubmit} className={styles.product__form}>
          <Input
            type='text'
            name='name'
            label='Name'
            value={name}
            onChange={handleChange(setName)}
          />
          <Textarea
            name='description'
            label='Description'
            value={description}
            onChange={handleChange(setDescription)}
          />
          <Input
            type='number'
            name='price'
            label='Price'
            value={price}
            onChange={handleChange(setPrice)}
          />
          <Button type='Submit' color='white' background='var(--blue)'>
            Submit
          </Button>
        </form>
      </div>
      <div className={styles.product__images}>
        <Dropzone onDrop={onDrop} accept={'image/*'} />
        <ImageList
          images={images.map((image, index) => ({
            id: index,
            src: URL.createObjectURL(image),
          }))}
        />
      </div>
    </div>
  );
};

CreateProduct.propTypes = {};

export default CreateProduct;
