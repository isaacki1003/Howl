import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../store/map';
import MapSingleBusiness from './MapSingleBusiness';

const MapHelper = ({ business }) => {
    const key = useSelector(state => state.map.key)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!key) {
            dispatch(getKey())
        }
    }, [dispatch, key])

    if (!key) return null

    return (
        <MapSingleBusiness apiKey={key} business={business} />
    )
}

export default MapHelper;
