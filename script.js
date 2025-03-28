document.addEventListener('DOMContentLoaded', () =>{
    if (document.getElementById('caregiver')) {
        loadCaregivers();
    }
    if (document.getElementById('caregiverlist')){
        loadCaregiverProfiles();
    }
    if (document.getElementById('review-list')) {
        loadReviews();

    }
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingForm);
    }
});
//function to load caregiver 
async function loadCaregivers() {
    try {
        const response = await fetch('http://localhost:3000/caregivers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const caregivers = await response.json();
        console.log(caregivers);
        const caregiverSelect = document.getElementById('caregiver');
        if (caregiverSelect){
            

        }

        caregivers.forEach(caregiver => {
            const option = document.createElement('option');
            option.value = caregiver.id;
            option.textContent = caregiver.name;
            caregiverSelect.appendChild(option);

        });
    }catch (error) {
        console.log('Error fetching caregiver data', error);
    }
}
//function to load caregiver profile
async function loadCaregiverProfiles() {
    try {
        const response = await fetch('http://localhost:3000/caregivers');
        const caregivers = await response.json();
        const caregiverList = document.getElementById('caregiverlist');

        caregivers.forEach(caregiver => {
            const div = document.createElement('div');
            div.classList.add('caregiver-profile');

            const img = document.createElement('img');
            img.src = caregiver.image;
            img.alt = caregiver.name;
            img.style.cursor = 'pointer';

            div.appendChild(img);
            caregiverList.appendChild(div);
        });
    } catch (error) {
    
    }
}

//function to display caregiver information
function showCaregiverInfo(caregiver) {
    const nameElement = document.getElementById('caregiver-name');
    const experienceElement = document.getElementById('caregiver-experience');
    const certificationElement = document.getElementById('caregiver-certification');


    nameElement.innerHTML = caregiver.name;
    experienceElement.innerText = "Experience: " + caregiver.experience;
    certificationElement.innerText = "Certification " + caregiver.certification;

    
}
//function to handle book form submssion
function handleBookingForm(event) {
    event.preventDefault();
    const form = event.target;

    const bookingDetails = {
        caregiver: form.caregiver.value,
        date: form.appointmentDate.value,
        time: form.appointmentTime.value,
        name: form.userName.value,
        contact: form.userContact.value,
    };
    console.log('Booking Details:', bookingDetails);
    alert('Your appointment has been booked!');

}
//function to load reviews
async function loadReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();
        const reviewList = document.getElementById('review-list');

        reviews.forEach(review => {
            const div = document.createElement('div');
            div.innerHTML = `<h4>${review.user}</h4><p>${review.comment}</p>`;
            reviewList.appendChild(div);

        });
    }catch (error) {
        console.log('Error fetching reviews', error);
    }
}