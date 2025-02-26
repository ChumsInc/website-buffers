import React from 'react';
import {useGetVersionQuery} from "@/app/services/version";
import Badge from "react-bootstrap/Badge";

export default function AppVersion() {
    const {data, isFetching} = useGetVersionQuery();
    return (
        <Badge bg="secondary">Version: {isFetching ? '...loading' : data}</Badge>
    )
}
