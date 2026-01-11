//queary the DOM
const tablebody = document.querySelector(".burger-table__body");

//getting all burgers
const getAllBurgers = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/burgers");
        // console.log(res);
        const data = await res.json();
        console.log(data.data.burgers[0].images[0]);
        return data.data.burgers;
    } catch (err) {
        console.log("There is a error");
        console.log(err);
    }
};

// getAllBurgers();
const updateUI = async () => {
    const allBurgers = await getAllBurgers();
    allBurgers.forEach((burger) => {
        tablebody.innerHTML = `
        <tr class="burger-table__row">
            <td
                class="burger-table__cell burger-table__cell--info">
                    <div class="burger-info">
                        <img
                            class="burger-info__img"
                            src="http://127.0.0.1:8000/img/burgers/${burger.images[0]}"
                            alt="Burger"
                        />
                        <span class="burger-info__name"
                            >${burger.title}</span
                        >
                    </div>
                </td>
                <td class="burger-table__cell">
                    <span>${burger.category}</span>
                </td>
                <td class="burger-table__cell">
                    <span>${burger.ingredients}</span>
                </td>
                <td class="burger-table__cell">
                    <span>$${burger.price}</span>
                </td>
                <td class="burger-table__cell">
                    <span
                        ><button
                            class="btn btn--details"
                        >
                            Details
                        </button></span
                    >
                </td>
            </tr>
        `;
    });
};

updateUI();
