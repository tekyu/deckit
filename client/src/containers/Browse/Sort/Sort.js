import React, { Component } from "react";
import * as styles from "./Sort.module.scss";
import Select from "@components/Select/Select";
class Sort extends Component {
	state = {
		selectData: ["Author", "Latest", "Name", "Players"]
	};

	changeSortHandler = sortType => {
		let name = "test";
		name = name[0].las;
		console.log("sortTYPE", sortType);
	};

	render() {
		return (
			<div className={styles.container}>
				<label>Sort by</label>
				<Select
					data={this.state.selectData}
					handler={this.changeSortHandler}
				/>
				<div className={styles.search}>
					<input type="text" placeholder="Search by author" />
				</div>
			</div>
		);
	}
}

export default Sort;
