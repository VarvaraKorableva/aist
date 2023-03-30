
import './Solutions.css'
import Solutions from './Solutions'

function SolutionsList({complects}) {

  return (
      <section className="solutions">
        <h2 className="solutions__title">Автоматизация под ключ</h2>
        <ul className="solutions__offer-container">
        {complects.length > 0 && complects.map((item)=> (
              <Solutions
                key={item.id}
                data={item}
              />
        ))}
        </ul>
      </section>
  );
}

export default SolutionsList;