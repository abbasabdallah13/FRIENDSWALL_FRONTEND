import jwt_decode from 'jwt-decode'

export const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    return decoded;
}

export const getCountryFlag = (country) => {
    switch(country){
        case 'Argentina':
            return 'ar';
        case 'Aland Islands':
            return 'ax';
        case 'Albania':
            return 'al';
        case 'Algeria':
            return 'dz';
        case 'American Samoa':
            return 'as'; 
        case 'Andorra':
            return 'ad';
        case 'Angola':
            return 'ao';
        case 'Anguilla':
            return 'ai';
        case 'Antarctica':
            return 'aq';
        case 'Antigua and Barbuda':
            return 'ag'; 
        case 'Afghanistan':
            return 'af';
        case 'Lebanon':
            return 'LB';
        case 'United States':
            return 'US';
        case 'United Kingdom':
            return 'GB';
        case 'United Arab Emirates':
            return 'ae'; 
        //new
        case 'Armenia':
            return 'am';
        case 'Aruba':
            return 'aw';
        case 'Australia':
            return 'au';
        case 'Austria':
            return 'at';
        case 'Azerbaijan':
            return 'az'; 
        case 'Bahamas':
            return 'bs';
        case 'Bahrain':
            return 'bh';
        case 'Bangladesh':
            return 'bd';
        case 'Barbados':
            return 'bb';
        case 'Belarus':
            return 'by'; 
        case 'Belgium':
            return 'be';
        case 'Belize':
            return 'bz';
        case 'Benin':
            return 'bj';
        case 'Bermuda':
            return 'bm';
        case 'Bhutan':
            return 'bt'; 
        case 'Bolivia':
            return 'bo';
        case 'Bonaire, Sint Eustatius and Saba':
            return 'bq';
        case 'Bosnia and Herzegovina':
            return 'ba';
        case 'Botswana':
            return 'bw';
        case 'Bouvet Island':
            return 'bv'; 
        case 'Brazil':
            return 'br';
        case 'British Indian Ocean Territory':
            return 'io';
        case 'Brunei Darussalam':
            return 'bn';
        case 'Bulgaria':
            return 'bg';
        case 'Burkina Faso':
            return 'bf'; 
        case 'Burundi':
            return 'bi';
        case 'Cabo Verde':
            return 'cv';
        case 'Cambodia':
            return 'kh';
        case 'Cameroon':
            return 'cm';
        case 'Canada':
            return 'ca'; 
        case 'Cayman Islands':
            return 'ky';
        case 'Central African Republic':
            return 'cf';
        case 'Chad':
            return 'td';
        case 'Chile':
            return 'cl'; 
        case 'China':
            return 'cn';
        case 'Christmas Island':
            return 'cx';
        case 'Cocos (Keeling) Islands':
            return 'cc';
        case 'Colombia':
            return 'co';
        case 'Comoros':
            return 'km'; 
        case 'Cook Islands':
            return 'ck';
        case 'Costa Rica':
            return 'cr';
        case 'Croatia':
            return 'hr';
        case 'Cuba':
            return 'cu';
        case 'Curaçao':
            return 'cw'; 
        case 'Cyprus':
            return 'cy';
        case 'Czech Republic':
            return 'cz';
        case "Cote D'Ivoire":
            return 'ci';
        case 'Democratic Republic of the Congo':
            return 'cd';
        case 'Denmark':
            return 'dk'; 
        case 'Djibouti':
            return 'dj';
        case 'Dominica':
            return 'dm';
        case 'Dominican Republic':
            return 'do';
        case 'Ecuador':
            return 'ec';
        case 'Egypt':
            return 'eg'; 
        case 'El Salvador':
            return 'sv';
        case 'Equatorial Guinea':
            return 'gq';
        case 'Eritrea':
            return 'er';
        case 'Estonia':
            return 'ee';
        case 'Eswatini':
            return 'sz'; 
        default:
            return ''
    }
}