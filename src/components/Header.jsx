import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className="flex flex-row justify-between items-center py-4">
            <p>Countries of the World</p>
            <div className="flex flex-row gap-4 items-center">
                <Link to="/">Countries</Link>
                <Link to="/favorites">Favorites</Link>
                <SearchBar />
            </div>
        </div>
    )
}

export default Header