function getImageUrl(imageId, size = 's') {
    return (
      'https://i.imgur.com/' +
      imageId +
      size +
      '.jpg'
    );
  }
  

function Profile({ 
  name, 
  profession, 
  awardsNum, 
  awards, 
  discovered,
  source,
  size = 70,
  classText = "avatar"
  }) {
  return (
    <>
      <section className="profile">
        <h2>{name}</h2>
        <img
          className={classText}
          src={getImageUrl(source)}
          alt={name}
          width={size}
          height={size}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            {profession}
          </li>
          <li>
            <b>Awards: {awardsNum} </b> 
            {awards}
          </li>
          <li>
            <b>Discovered: </b>
            {discovered}
          </li>
        </ul>
      </section>
    </>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile 
        source='szV5sdG'
        name='Maria Skłodowska-Curie'
        profession='physicist and chemist'
        awardsNum='4'
        awards='(Nobel Prize in Physics, Nobel Prize in 
                Chemistry, Davy Medal, Matteucci Medal)'
        discovered='polonium (element)'
      />
      <Profile 
        source='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        awardsNum='2'
        awards='(Miyake Prize for geochemistry, Tanaka Prize)'
        discovered='a method for measuring carbon dioxide in seawater'
      />
    </div>
  );
}
