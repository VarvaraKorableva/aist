
import './Solutions.css'
import Description from './Description'

function Solutions({ data, onSolution }) {

    function handleClick() {
        onSolution(data)
    }

    let description = data.description.split(',')

  return (

          <li className="solutions__offer">
            <h2 className="solutions__offer-title">{data.name}:</h2>
            <ul className="solutions__offer-wrapper">
            {description.length > 0 && description.map((item)=> (
              <Description
              key={item.index}
              item={item}
              />
            ))}
            </ul>
            <div className="solutions__offer-price-and-btn-container">
                <p className="solutions__offer-price">Цена: {data.price}</p>
                <button className="solutions__offer-btn" onClick={handleClick}>Выбрать</button>
            </div>
          </li>
  );
}

export default Solutions;

/*

, isButtonChanged
                {isButtonChanged? 

                <button className="solutions__offer-btn" onClick={handleClick}>Добавлено</button>
                :
                <button className="solutions__offer-btn" onClick={handleClick}>Выбрать</button>
                }


*/
