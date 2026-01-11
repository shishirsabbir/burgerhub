// query selection
const burgerTile = document.getElementById("burger_tile");
const burgerContainer = document.querySelector(".burger_container");

// burger data elements selection
const burgerTitle = burgerTile.querySelector("h4.burger_title");
const burgerDescription = burgerTile.querySelector("p.burger_description");
const burgerPrice = burgerTile.querySelector("p.burger_price");
// const burgerTagList = burgerTile.querySelector("ul.burger_tag_list");

const getAllBurgers = async (callback) => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/burgers");
        const data = await res.json();
        console.log(data);

        // pass single data
        callback(data?.data?.burgers[0]);
    } catch (err) {
        console.log("Error! ❌");
        console.error(err);
    }
};

const createImage = (imgURL, altText, className) => {
    const img = document.createElement("img");

    img.src = `http://127.0.0.1:8000/img/burgers/${imgURL}`;
    img.alt = altText;

    // img.onerror = () => {
    //     img.src = "/dummy_image.jpg";
    // };

    img.classList.add(className);

    return img;
};

const updateBurgerList = (data) => {
    burgerTitle.textContent = data.title;
    burgerDescription.textContent = data.description;
    burgerPrice.textContent = data.price;

    const burgerCoverImage = createImage(
        data.coverImage,
        `${data.title} Cover Image`,
        "burger_cover"
    );

    burgerTile.appendChild(burgerCoverImage);

    const imgArray = data.images.map((imgFile, i) => {
        const imgTag = createImage(
            imgFile,
            `${data.title} Image ${i}`,
            "burger_image"
        );
        return imgTag;
    });

    imgArray.forEach((imgTag) => {
        burgerTile.appendChild(imgTag);
    });
};

// running the fetch function
getAllBurgers(updateBurgerList);
