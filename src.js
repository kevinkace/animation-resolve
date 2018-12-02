const MAX_TIMEOUT = 1000;

module.exports = function(domNode, className, timeout = MAX_TIMEOUT) {
    return new Promise((resolve, reject) => {
        let resolved = false;

        // Use setTimeout as a failsafe incase the animation eventListener is never triggered
        const timeoutId = setTimeout(() => {
            // if somehow the animation resolved without clearing the timeout; this should never happen
            if (resolved) {
                return;
            }

            console.error(`Timeout occurred before animation completed: ${className}`);

            resolved = true;
            reject(false);
        }, timeout);

        domNode.addEventListener("animationend", () => {
            // timeout occurred before animation completed
            if (resolved) {
                return;
            }

            clearTimeout(timeoutId);

            resolved = true;
            resolve(true);
        }, { once : true, passive : true });

        // set the class name on the dom node
        domNode.className = className;
    });
}

module.exports.jsdoc = `/**
* Promise resolution when an animation ends
* @param {HTMLElement} domNode - DOM node to add class to
* @param {string} className - CSS class name which has an animation
* @param {number} timeout - max time before returned promise is resolved
* @returns {Promise} Promise that resolves when animation completes, rejects after timeout
*/`;

module.exports.header = "const MAX_TIMEOUT = 1000;";
