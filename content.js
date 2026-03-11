// --- CONFIGURATION ---
// IMPORTANT: Change this value to test different choices
// NAJBITNIJA STAVKA - NAĆI POMOĆU INSPECT ELEMENTA VRIJEDNOST KONKRETNOG ODABIRA
const TARGET_VALUE = "3331"; 

// Set to true to enable auto-refresh, false to disable
const AUTO_REFRESH = true; 

// Time to wait before refreshing (in milliseconds). 
const REFRESH_INTERVAL = 500; 

function autoSelectAndSave() {
    const radioButton = document.querySelector(`input[type="radio"][value="${TARGET_VALUE}"]`);

    // SCENARIO A: The radio button is on the page
    if (radioButton) {

        //If Moodle loads and it's already checked, we won! Stop the script.
        if (radioButton.checked) {
            console.log("Moodle Sniper: Mission accomplished! Choice is saved. Halting script.");
            return; 
        }
        
        // 1. It's on the page, but still disabled
        if (radioButton.disabled) {
            console.log("Moodle Sniper: Button is disabled. Refreshing soon...");
            if (AUTO_REFRESH) setTimeout(() => window.location.reload(), REFRESH_INTERVAL);
            return;
        }

        // 2. It's on the page, and unlocked! (STOP REFRESHING AND FIRE)
        console.log("Moodle Sniper: Target unlocked! Selecting...");
        radioButton.checked = true;

        // Using your exact button details for maximum accuracy
        const submitButton = document.querySelector('input[type="submit"][value="Save my choice"]');

        if (submitButton) {
            console.log("Moodle Sniper: Found the save button. Clicking...");
            submitButton.click();
            // Notice there is NO reload here. We hit save, so our job is done.
        } else {
            console.log("Moodle Sniper: Couldn't find the save button. Attempting a forced form submission...");
            const form = radioButton.closest('form');
            if (form) form.submit();
        }
    
    // SCENARIO B: The radio button isn't even on the page yet
    } else {
        console.log(`Moodle Sniper: Target value ${TARGET_VALUE} not found. The form might be hidden. Refreshing...`);
        // If the choice hasn't opened yet, Moodle might hide the form entirely. We refresh to keep checking.
        if (AUTO_REFRESH) setTimeout(() => window.location.reload(), REFRESH_INTERVAL);
    }
}

autoSelectAndSave();
