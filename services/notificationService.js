app.service('notificationService',function(){
  this.showMsg = function(msg, type) {
        let color = '';
        type == 'error'? color = '#ef4444' : color = '#14b8a6';
        Swal.fire({
            title: msg,
            icon: type, 
            toast: true,
            position: 'top-end', 
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true,
            background: '#ffffff',
            iconColor: color,
        });
    };


    this.confirm = function(title, text, iconType, confirmText) {
            return Swal.fire({
                title: title,
                text: text,
                icon: iconType,
                showCancelButton: true,
                confirmButtonColor: '#14b8a6', 
                cancelButtonColor: '#ef4444', 
                confirmButtonText: confirmText,
                cancelButtonText: 'Cancel'
            });
        }
});