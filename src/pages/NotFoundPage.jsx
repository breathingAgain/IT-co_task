import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFoundPage = () => {
    return (
        <div className="container">
            <h1>Такой страницы не существует. Перейти на <Link to="/">главную</Link></h1>
        </div>
    )
}

export {NotFoundPage};
