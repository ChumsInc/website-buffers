import {StyledErrorAlert} from "@/types/alerts";

export const alertSorter = (a: StyledErrorAlert, b: StyledErrorAlert) => a.id - b.id;
