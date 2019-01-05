import React, { Component } from "react";
import * as styles from "./Select.module.scss";
export default class Select extends Component {
	constructor(props) {
		super(props);

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	state = {
		show: false,
		display: null
	};
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState(state => {
				return {
					show: false
				};
			});
		}
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	showDrodpown = () => {
		this.setState(state => {
			return {
				show: !state.show
			};
		});
	};

	changeSort = key => {
		this.setState(
			state => {
				return {
					display: state.display === key ? state.display : key
				};
			},
			() => {
				if (this.handler && typeof this.handler === "function") {
					this.handler(this.state.display);
				}
			}
		);
	};

	populateOptions = () => {
		let displayOption = this.state.display
			? this.state.display
			: this.props.data[0];
		let options = this.props.data.map(key => {
			if (key === displayOption) {
				return null;
			}
			return (
				<li
					onClick={() => {
						this.changeSort(key);
					}}
					key={key}>
					{key}
				</li>
			);
		});
		return { displayOption, options };
	};

	render() {
		const { displayOption, options } = this.populateOptions();
		console.log("dis    ", displayOption, options);
		const display = (
			<div className={styles.display} onClick={this.showDrodpown}>
				{this.state.display ? this.state.display : displayOption}
			</div>
		);
		const dropdown = (
			<div className={styles.dropdown}>
				<ul>{options}</ul>
			</div>
		);
		return (
			<div className={styles.container} ref={this.setWrapperRef}>
				{display}
				{this.state.show ? dropdown : null}
			</div>
		);
	}
}

// export default Select;
