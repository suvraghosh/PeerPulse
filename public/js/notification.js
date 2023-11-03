const notificationToggle = document.getElementById('notification-toggle');
const notificationContent = document.getElementById('notification-content');

notificationToggle.addEventListener('click', function () {
    if(notificationContent.style.display == 'none'){
        notificationContent.style.display = 'block';
    }else{
        notificationContent.style.display = 'none';
    }
});
