var Validation = (function() {
    let _errors = {
        email: "Please enter valid Email address",
        text: "String contains illegal characters (',\")",
        empty: "Field cannot be empty"
    }

    function _email(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function _text(text) {
        return !((text.search("'") >= 0) || (text.search("\"") >= 0));
    }

    function _empty(text) {
        return !(text.trim() === "");
    }


    return {
        errors: _errors,
        email: _email,
        text: _text,
        empty: _empty
    }
})();


var App = (function() {
    document.addEventListener("DOMContentLoaded", function(e) {
        flatpickr("input[type='date']", {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            maxDate: "today"
        });

        let form = document.getElementById("form");

        let errorMsgTpl = form.querySelector("#error-msg-tpl");

        let textFields = form.querySelectorAll(".validate-text");
        let emailFields = form.querySelectorAll(".validate-email");
        let emptyFields = form.querySelectorAll(".validate-empty");

        let validateFields = [
            {
                type: "text",
                fields: textFields
            },
            {
                type: "email",
                fields: emailFields
            },
            {
                type: "empty",
                fields: emptyFields
            }
        ];

        function createErrorBlocks() {
            let errorBlock = document.importNode(errorMsgTpl.content, true);

            validateFields.forEach(function(i) {
                i.fields.forEach(function(field) {
                    field.parentNode.insertBefore(document.importNode(errorMsgTpl.content, true), field.nextSibling);
                });
            });
        }

        function clearErrorBlocks() {
            let blocks = document.querySelectorAll(".error-msg");

            blocks.forEach(function(i) {
                i.innerHTML = "";
                i.previousElementSibling.classList.remove("invalid");
            });
        }

        createErrorBlocks();

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let errorsCount = 0;

            clearErrorBlocks();
    
            validateFields.forEach(function(i) {
                switch (i.type) {
                    case "email":
                        i.fields.forEach(function(field) {
                            if(!Validation.email(field.value)) {
                                field.nextElementSibling.innerHTML += "• " + Validation.errors.email + "<br>";
                                field.classList.add("invalid");
                                errorsCount++;
                            }
                        });
                        break;
                    case "text":
                        i.fields.forEach(function(field) {
                            if(!Validation.text(field.value)) {
                                field.nextElementSibling.innerHTML += "• " + Validation.errors.text + "<br>";
                                field.classList.add("invalid");
                                errorsCount++;
                            }
                        });
                        break;
                    case "empty":
                        i.fields.forEach(function(field) {
                            if(!Validation.empty(field.value)) {
                                field.nextElementSibling.innerHTML += "• " + Validation.errors.empty + "<br>";
                                field.classList.add("invalid");
                                errorsCount++;
                            }
                        });
                        break;
                }
            });

            if(!errorsCount) {
                
            }
        });
    });

}());