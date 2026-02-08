        const URL = "https://teachablemachine.withgoogle.com/models/dXLKfkRfa/";
        let model, maxPredictions;

        const fileInput = document.getElementById('file-input');
        const uploadedImage = document.getElementById('uploaded-image');
        const predictButton = document.getElementById('predict-button');
        const labelContainer = document.getElementById('label-container');
        const resetButton = document.getElementById('reset-button'); // Added reset button reference
        const loadingSpinner = document.getElementById('loading-spinner'); // Added loading spinner reference

        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            // Append prediction result divs only, spinner div is already in HTML
            for (let i = 0; i < maxPredictions; i++) {
                const predictionDiv = document.createElement("div");
                predictionDiv.className = 'prediction-result'; // Add a class for styling
                labelContainer.appendChild(predictionDiv);
            }

            predictButton.addEventListener('click', predict);
            resetButton.addEventListener('click', reset); // Added reset button event listener
        }

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedImage.src = e.target.result;
                    uploadedImage.style.display = 'block';
                    predictButton.disabled = false; // Enable predict button
                    // Clear previous predictions
                    for (let i = 0; i < maxPredictions; i++) {
                        labelContainer.childNodes[i].innerHTML = '';
                    }
                };
                reader.readAsDataURL(file);
            } else {
                uploadedImage.style.display = 'none';
                uploadedImage.src = '#';
                predictButton.disabled = true; // Disable predict button
                for (let i = 0; i < maxPredictions; i++) {
                    labelContainer.childNodes[i].innerHTML = '';
                }
            }
        });

        async function predict() {
            if (!uploadedImage.src || uploadedImage.style.display === 'none') {
                alert('먼저 이미지를 업로드해주세요.');
                return;
            }

            // Hide previous predictions and show spinner
            for (let i = 0; i < maxPredictions; i++) {
                if (labelContainer.childNodes[i+1]) { // childNodes[0] is the spinner
                    labelContainer.childNodes[i+1].innerHTML = '';
                }
            }
            loadingSpinner.style.display = 'block';

            const prediction = await model.predict(uploadedImage);
            loadingSpinner.style.display = 'none'; // Hide spinner after prediction

            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
                if (labelContainer.childNodes[i+1]) { // childNodes[0] is the spinner
                    labelContainer.childNodes[i+1].innerHTML = classPrediction;
                }
            }
        }

        // Added reset function
        function reset() {
            fileInput.value = ''; // Clear the file input
            uploadedImage.style.display = 'none'; // Hide the image
            uploadedImage.src = '#'; // Clear the image source
            predictButton.disabled = true; // Disable predict button
            loadingSpinner.style.display = 'none'; // Ensure spinner is hidden on reset
            for (let i = 0; i < maxPredictions; i++) {
                // Clear prediction results
                if (labelContainer.childNodes[i+1]) { // childNodes[0] is the spinner
                    labelContainer.childNodes[i+1].innerHTML = '';
                }
            }
        }

        // Initialize the model when the page loads
        init();