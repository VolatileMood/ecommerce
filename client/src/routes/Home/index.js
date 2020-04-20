import React from 'react';
import styles from './Home.module.css';
import ImageLink from '../../components/ImageLink';
// Images
import man from '../../media/images/man.jpeg';
import woman from '../../media/images/woman.jpeg';
import shoes from '../../media/images/shoes.jpeg';
import accessories from '../../media/images/accessories.jpeg';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__grid}>
        <ImageLink
          src={man}
          alt='Man with sunglasses staring into the sun.'
          buttonLabel='Men'
          path='/'
        />
        <ImageLink
          src={woman}
          alt='Woman adjusting sunglasses with both hands, while tilting her head.'
          buttonLabel='Women'
          path='/'
        />
        <ImageLink
          src={shoes}
          alt='Person walking down the stairs.'
          buttonLabel='Shoes'
          path='/'
        />
        <ImageLink
          src={accessories}
          alt='Accessories spread on table.'
          buttonLabel='Accessories'
          path='/'
        />
      </div>
    </div>
  );
};

export default Home;
