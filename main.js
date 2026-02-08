const URL = "https://teachablemachine.withgoogle.com/models/dXLKfkRfa/";
let model, maxPredictions;

const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');
const predictButton = document.getElementById('predict-button');
const labelContainer = document.getElementById('label-container');
const resetButton = document.getElementById('reset-button');
const loadingSpinner = document.getElementById('loading-spinner');

// Function to clear prediction results
function clearPredictionResults() {
    const predictionResults = document.querySelectorAll('.prediction-result');
    predictionResults.forEach(div => div.innerHTML = '');
    loadingSpinner.style.display = 'none'; // Ensure spinner is hidden when clearing
}

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        for (let i = 0; i < maxPredictions; i++) {
            const predictionDiv = document.createElement("div");
            predictionDiv.className = 'prediction-result';
            labelContainer.appendChild(predictionDiv);
        }
    } catch (error) {
        console.error("모델 로딩 중 오류 발생:", error);
        labelContainer.innerHTML = '<div style="color: red;">모델을 로딩할 수 없습니다.</div>';
        predictButton.disabled = true;
    }

    predictButton.addEventListener('click', predict);
    resetButton.addEventListener('click', reset);
}

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            predictButton.disabled = false;
            clearPredictionResults(); // Clear previous predictions
        };
        reader.readAsDataURL(file);
    } else {
        uploadedImage.style.display = 'none';
        uploadedImage.src = '#';
        predictButton.disabled = true;
        clearPredictionResults(); // Clear previous predictions
    }
});

async function predict() {
    if (!uploadedImage.src || uploadedImage.style.display === 'none') {
        alert('먼저 이미지를 업로드해주세요.');
        return;
    }

    clearPredictionResults(); // Clear previous predictions and hide spinner
    loadingSpinner.style.display = 'block';

    try {
        const prediction = await model.predict(uploadedImage);
        loadingSpinner.style.display = 'none';

        const predictionResults = document.querySelectorAll('.prediction-result');
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
            if (predictionResults[i]) {
                predictionResults[i].innerHTML = classPrediction;
            }
        }
    } catch (error) {
        console.error("예측 중 오류 발생:", error);
        loadingSpinner.style.display = 'none';
        labelContainer.innerHTML += '<div style="color: red;">예측 중 오류가 발생했습니다.</div>';
    }
}

function reset() {
    fileInput.value = '';
    uploadedImage.style.display = 'none';
    uploadedImage.src = '#';
    predictButton.disabled = true;
    clearPredictionResults(); // Clear all predictions and hide spinner
}

init();

// Social Sharing Functions
const pageUrl = "https://product-builder-lecture-2x8.pages.dev/"; // Replace with your actual deployed URL
const pageTitle = "강아지상 vs 고양이상 테스트 - 나의 동물상 찾아보기";
const pageDescription = "AI가 당신의 얼굴에서 강아지상과 고양이상의 특징을 분석하여 동물상 지수를 알려드립니다. 재미있는 얼굴 분석 테스트!";
const pageImage = "https://product-builder-lecture-2x8.pages.dev/og-image.jpg"; // Replace with your actual Open Graph image

document.addEventListener('DOMContentLoaded', () => {
    const kakaoShareButton = document.getElementById('kakao-share-button');
    const facebookShareButton = document.getElementById('facebook-share-button');
    const twitterShareButton = document.getElementById('twitter-share-button');

    if (kakaoShareButton) {
        kakaoShareButton.addEventListener('click', () => {
            if (Kakao.isInitialized()) {
                Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: pageTitle,
                        description: pageDescription,
                        imageUrl: pageImage,
                        link: {
                            mobileWebUrl: pageUrl,
                            webUrl: pageUrl,
                        },
                    },
                    buttons: [
                        {
                            title: '웹으로 보기',
                            link: {
                                mobileWebUrl: pageUrl,
                                webUrl: pageUrl,
                            },
                        },
                    ],
                });
            } else {
                console.error('Kakao SDK not initialized. Please check your JavaScript key.');
                alert('카카오톡 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.');
            }
        });
    }

    if (facebookShareButton) {
        facebookShareButton.addEventListener('click', () => {
            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            window.open(facebookShareUrl, 'facebook-share-dialog', 'width=800,height=600');
        });
    }

    if (twitterShareButton) {
        twitterShareButton.addEventListener('click', () => {
            const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
            window.open(twitterShareUrl, 'twitter-share-dialog', 'width=800,height=600');
        });
    }
});