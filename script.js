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
        const response = await fetch('https://live-json-server-sand.vercel.app/caregivers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const caregivers = await response.json();
        console.log(caregivers);
        const caregiverSelect = document.getElementById('caregiver');
        if (caregiverSelect){
            

        }

        for(x in caregivers)  {
            const caregiver = caregivers[x]
            const option = document.createElement('option');
            option.value = caregiver.id;
            option.textContent = x;
            caregiverSelect.appendChild(option);

        };
    }catch (error) {
        console.log('Error fetching caregiver data', error);
    }
}
//function to load caregiver profile
async function loadCaregiverProfiles() {
    try {
        const response = await fetch('https://live-json-server-sand.vercel.app/caregivers');
        const caregivers = await response.json();
        const caregiverList = document.getElementById('caregiverlist');

        for (y in caregivers){
            const x = caregivers[y]
            const div = document.createElement('div');
            div.classList.add('caregiver-profile');

            const img = document.createElement('img');
            img.src = x.image;
            img.alt = x.name;
            img.style.cursor = 'pointer';

            div.appendChild(img);
            caregiverList.appendChild(div);
            console.log(x);
        };
    } catch (error) {
        console.log(error);
    
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
        const response = await fetch('https://live-json-server-sand.vercel.app/reviews');
        const reviews = await response.json();
        const reviewList = document.getElementById('review-list');

        for(z in reviews) {
          const t = reviews[z];
            const div = document.createElement('div');
            div.innerHTML = `<h4>${t.user}</h4><p>${t.comment}</p>`;
            reviewList.appendChild(div);
            console.log(t);

        };
    }catch (error) {
        console.log('Error fetching reviews:', error);
    }
}
//handle payment form submission
document.getElementById('payment-form').addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    
    if(!name ||!eamil ||!cardNumber ) {
        alert('please fill out all fields!');

       
    }
    alert(`payment succesful for ${name} with email: ${email}`);
});

document.getElementById('schedule-form').addEventListener('submit', function(event){
    event.preventDefault();
    const caregiverName = document.getElementById('caregiver-name').value;
    const scheduleDate = document.getElementById('schedule-date').value;
    const scheduleTime = document.getElementById('schedule-time').value;

    if(!caregiverName || !scheduleDate || !scheduleTime) {
        alert('please select a caregiver and schedule a time!');
        return;
    }
    alert(`caregiver ${caregiverName} is scheduled for ${scheduleDate} at ${scheduleTime}`);
});