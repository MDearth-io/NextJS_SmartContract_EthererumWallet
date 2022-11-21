import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAddress, useMarketplace } from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';

import TopNavbarLayout from '../../../layouts/TopNavbarLayout';
import NFTImage from '../../../components/NFTDetails/NFTImage';

const styles = {}

const NFT = () => {
    const [listing, setListing] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { tokenID } = router.query;
    const marketplace = useMarketplace('0x2284eD2822E00E196Ed0D7D3AA603f9E56e65684');
    const address = useAddress();

    useEffect(() => {
        getListing();
    },[])

    useEffect(() => {
        if (!address) {
            router.replace('/');
        }
    }, [address])

    const getListing = async () => {
        try {
            setLoading(true);
            const listing = await marketplace.getListing(BigNumber.from(tokenID));
            setListing(listing);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    console.log('Listing:', listing);

    return (
        <TopNavbarLayout>
            <div className={styles.wrapper}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.nftContainer}>
                        <div className={styles.leftContainer}>
                            <div className={styles.leftElement}>
                                <NFTImage image = {listing?.asset?.image}/>
                            </div>
                            <div className={styles.leftElement}>
                                {/* <NFTDetails /> */}
                            </div>
                        </div>
                        <div className={styles.rightContainer}>
                            {/* <NFTBasicInfo /> */}
                            <div className={styles.buyoutContainer}>
                                {/* <NFTSalesInfo /> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </TopNavbarLayout>
    )
}

export default NFT;