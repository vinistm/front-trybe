

const Home = ({ authenticated }) => {
  
  return (
    <>
      {authenticated ? (
        <div>
          <h1>oi</h1>
        </div>
      ) : (
        <div>
         <h1> ola </h1>
        </div>
      )}
    </>
  );
};

export default Home;
