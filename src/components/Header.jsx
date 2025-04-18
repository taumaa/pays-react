import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className="flex flex-row justify-between items-center py-4">
            <Link to="/" className="flex items-center">
                <img src="/logo.png" alt="Countries of the World Logo" className="h-28" />
            </Link>
            <div className="flex flex-row gap-4 items-center">
                <Link className='text-lg font-bold' to="/">Countries</Link>
                <Link className='text-lg font-bold' to="/favorites">Favorites</Link>
                <SearchBar />
            </div>
        </div>
    )
}

export default Header