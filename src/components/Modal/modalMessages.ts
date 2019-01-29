export enum ModalMessageKeys { NO_RESULTS, ERROR_SEARCH }

export interface IModalMessage {
    title: string,
    message: string
}

export const getModalMessage = (modalKey: ModalMessageKeys): IModalMessage => {
    switch (modalKey) {
        case ModalMessageKeys.NO_RESULTS: {
            return {
                title: "No results",
                message: "Please search again."

            }
        }
        case ModalMessageKeys.ERROR_SEARCH: {
            return {
                title: "Search Error",
                message: "An error occurred while getting results. Please try again."

            }
        }
        default:
            return {
                title: "Error",
                message: "There was an error."
            }
    }
}