const Container = ({children}) => {
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 flex flex-col space-y-8">
            {children}
        </div>
    )
}

export default Container