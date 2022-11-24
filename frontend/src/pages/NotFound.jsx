import notFound from '../asset/notFound.png'

const NotFound = () => {
    return (
        <div className="py-16 px-2 sm:px-16">
            <div className="flex justify-center items-center mt-24 lg:mt-4">
                <div className="py-8 pl-8 sm:pl-0 sm:py-0 w-1/2">
                    <h1 className="text-5xl sm:text-8xl font-bold text-orange">404</h1>
                    <p className="text-sm mb-8 sm:mb-0 sm:text-lg pb-4 pt-2 sm:pt-1 sm:pb-10">Sorry, you've found a page that doesnt exist 😞</p>
                </div>
                <div className="flex justify-end w-1/2">
                    <img src={notFound} className="hidden lg:block" alt="Task PNG" />
                </div>
            </div>
        </div>
    );
}

export default NotFound;