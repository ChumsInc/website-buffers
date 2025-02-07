import React from 'react';
import Stack from 'react-bootstrap/Stack';
import LoadItemsForm from "@/components/LoadItemsForm";
import ItemFilters from "@/components/ItemFilters";

export default function AppControlBar() {
    return (
        <Stack direction="horizontal" gap={2} className="space-between">
            <LoadItemsForm/>
            <ItemFilters className="ms-auto"/>
        </Stack>
    );
}

