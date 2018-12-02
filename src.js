const MAX_TIMEOUT = 5000; // !!! must stay in sync with string at bottom

module.exports = function animationResolve(domNode, className, { timeout = MAX_TIMEOUT, add = false } = {}) {
    if (!domNode || !className) {
        return Promise.reject(false);
    }

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

            // this is the happy path, animation completed and timeout hasn't fired
            clearTimeout(timeoutId);
            resolved = true;

            resolve(true);
        }, { once : true, passive : true });

        // set the class name on the dom node
        if (domNode.namespaceURI === "http://www.w3.org/2000/svg") {
            // svgElement.className is an SVGAnimatedString, treat differently
            if (add) {
                domNode.className.baseVal += ` ${className}`;
            } else {
                domNode.className.baseVal = className;
            }

            return;
        }

        if (add) {
            domNode.classList.add(className);
        } else {
            domNode.className = className;
        }
    });
}

module.exports.header = `const MAX_TIMEOUT = ${MAX_TIMEOUT};`;

module.exports.jsdoc = `
/**
 * Options
 * @typedef {Object} OptsType
 * @property {number} [timeout=${MAX_TIMEOUT}] - max time in ms before returned promise is force resolved
 * @property {boolean} [add=false] - replace or add class name
 */

/**
 * Promise resolution when a CSS animation ends
 * @param {HTMLElement} domNode - DOM node to add class to
 * @param {string} className - CSS class name which has an animation
 * @param {OptsType} [options] - OptsType: timeout, add
 * @returns {Promise} Promise that resolves when animation completes, rejects after timeout
*/`;
