import {createSelector} from "reselect";
import {ProductLine} from "chums-types";
import {selectProductLineFilter} from "@/ducks/filters/index";
import {RootState} from "@/app/configureStore";
import {productLineApi} from "@/app/services/productLines";

export const selectAllProductLines = productLineApi.endpoints.getProductLines.select();

export const selectProductByPL = createSelector(
    [selectAllProductLines, (state: RootState, pl: string | null) => pl],
    (productLines, value): ProductLine | null => {
        const [pl] = (productLines.data ?? []).filter(pl => pl.ProductLine === value);
        return pl ?? null;
    });

export const selectProductLineName = (state: RootState) => {
    const filter = selectProductLineFilter(state);
    return selectProductByPL(state, filter)?.ProductLineDesc ?? 'All';
}
