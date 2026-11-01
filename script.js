
// Waste information database
const wasteData = {
    "plastic bottle": {
        category: "Dry Waste",
        method: "Recycle",
        guidance: "Empty the bottle, rinse it and give it to a suitable plastic recycling collector."
    },

    "paper": {
        category: "Dry Waste",
        method: "Recycle",
        guidance: "Keep newspapers, notebooks and cardboard clean and dry for recycling."
    },

    "newspaper": {
        category: "Dry Waste",
        method: "Recycle",
        guidance: "Collect old newspapers separately and give them to a paper recycler."
    },

    "vegetable peels": {
        category: "Wet Waste",
        method: "Composting",
        guidance: "Add vegetable peels to a compost bin to produce natural manure."
    },

    "fruit peels": {
        category: "Wet Waste",
        method: "Composting",
        guidance: "Use fruit peels in a compost bin along with suitable dry leaves."
    },

    "old clothes": {
        category: "Reusable Waste",
        method: "Reuse or Donate",
        guidance: "If they are clean and usable, donate them to people or organisations in need."
    },

    "books": {
        category: "Reusable Waste",
        method: "Reuse or Donate",
        guidance: "Donate usable books to schools, libraries or students."
    },

    "glass bottle": {
        category: "Dry Waste",
        method: "Recycle",
        guidance: "Keep glass separate and take it to an appropriate glass recycling facility."
    },

    "cardboard": {
        category: "Dry Waste",
        method: "Reuse or Recycle",
        guidance: "Reuse cardboard boxes or give clean, dry cardboard to recyclers."
    },

    "battery": {
        category: "Special-care Waste",
        method: "Safe Disposal",
        guidance: "Do not put batteries in ordinary household waste. Keep them separate and use an authorised battery collection point."
    },

    "mobile phone": {
        category: "Electronic Waste",
        method: "E-waste Recycling",
        guidance: "Give old phones to an authorised e-waste collection centre. Remove personal data before handing over the device."
    },

    "expired medicine": {
        category: "Special-care Waste",
        method: "Safe Disposal",
        guidance: "Do not flush medicines or mix them with ordinary waste. Ask a pharmacy or authorised local collection service about safe disposal."
    },

    "food waste": {
        category: "Wet Waste",
        method: "Composting",
        guidance: "Separate suitable food scraps and use a composting system. Avoid adding meat, dairy or oily food to a basic home compost bin."
    },

    "aluminium can": {
        category: "Dry Waste",
        method: "Recycle",
        guidance: "Empty and rinse the can before giving it to a metal recycler."
    }
};


// Search waste items
function searchWaste() {

    let item = document.getElementById("wasteInput")
                    .value.trim().toLowerCase();

    let result = document.getElementById("result");

    if (item === "") {
        result.innerHTML = "Please enter a waste item.";
        return;
    }

    if (wasteData[item]) {

        let data = wasteData[item];

        result.innerHTML = `
            <h3>Waste Information</h3>
            <p><b>Item:</b> ${item}</p>
            <p><b>Category:</b> ${data.category}</p>
            <p><b>Recommended Method:</b> ${data.method}</p>
            <p><b>Guidance:</b> ${data.guidance}</p>
        `;

    } else {

        result.innerHTML = `
            <h3>Item Not Found</h3>
            <p>Please try another waste item.</p>
            <p>Examples: plastic bottle, paper, battery,
            books, vegetable peels, mobile phone.</p>
            <p>For unknown items, check with your local
            waste collection authority.</p>
        `;
    }
}


// Find nearby recycling centres
function findLocation() {

    let output = document.getElementById("locationResult");

    output.innerHTML = "Requesting your location...";

    if (!navigator.geolocation) {
        output.innerHTML =
            "Your browser does not support location services.";
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let mapURL =
                "https://www.openstreetmap.org/?mlat=" +
                latitude + "&mlon=" + longitude +
                "#map=14/" + latitude + "/" + longitude;

            let searchURL =
                "https://www.google.com/maps/search/recycling+centres/@" +
                latitude + "," + longitude + ",14z";

            output.innerHTML = `
                <h3>Location Found!</h3>
                <p>Latitude: ${latitude.toFixed(4)}</p>
                <p>Longitude: ${longitude.toFixed(4)}</p>
                <p>Explore your nearby recycling locations:</p>
                <p><a href="${searchURL}" target="_blank"
                rel="noopener">Find Recycling Centres on Google Maps</a></p>
                <p><a href="${mapURL}" target="_blank"
                rel="noopener">View Your Location on OpenStreetMap</a></p>
                <p>Please verify the facility's availability and
                accepted waste materials before visiting.</p>
            `;
        },

        function(error) {

            output.innerHTML =
                "Unable to access your location. Please allow location permission and try again.";

        }
    );
}