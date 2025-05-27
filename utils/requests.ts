const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties({showFeatured = false} = {}) {
    try {
        // handle the case where the domain is not available yet 
        if (!apiDomain) {
            return [];
        }

        const res = await fetch(
            `&{apiDomain}/properties${showFeatured ? '/featured' : ''}`, {cache: 'no-store'}
        );

        if(!res.ok) {
            throw new Error('Failed to fetch Data');
        }

        return res.json();
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
            }
    }

    // fetch single property
async function fetchProperty(id) {
    try {
    // handle the case where the domain is not available yet 
        if (!apiDomain) {
            return null;
        }
        
        const res = await fetch(`${apiDomain}/properties/${id}`);
        if(!res.ok) {
            throw new Error('Failed to fetch Data');
        }
        
        return res.json();
            } catch (error) {
                console.error('Error fetching property:', error);
                return null;
            }
}

export { fetchProperties, fetchProperty };