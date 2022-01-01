const dummyArray = ["", "", "", "", "", ""];

const Spinner = () => {
    return (
        <div classname="spinner">
            {dummyArray.map(() => {
                return <div className="spinner__card"></div>;
            })}
        </div>
    );
};

export default Spinner;
