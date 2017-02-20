import { observable } from "mobx"
import ChargeStatusViewType from "./ChargeStatusViewType.js"

class AppState {
  @observable batteries = []
  @observable loadingBatteries = false
	@observable currentTitle = "BatMobile"
	@observable renderDetailsView = false
	@observable selectedChargeStatusViewType = ChargeStatusViewType.Percent
	@observable selectedBattery = null

	// For the details view on android before the new navigator
	showDetails(battery) {
    this.selectedBattery = battery;
    this.renderDetailsView = true;
	}
	hideDetails() {
		this.selectedBattery = undefined;
    this.renderDetailsView = false;
	}
}

let state = new AppState()
export default state
