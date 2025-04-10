const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-auto rounded-xl">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Countries Explorer. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Data provided by REST Countries API</p>
            </div>
        </footer>
    )
}

export default Footer;