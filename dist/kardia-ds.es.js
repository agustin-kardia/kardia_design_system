import "react";
import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Alert/Alert.tsx
var r = {
	neutral: "var(--color-base-low)",
	info: "var(--color-feedback-info-light)",
	success: "var(--color-feedback-success-light)",
	warning: "var(--color-feedback-warning-light)",
	critical: "var(--color-feedback-branded-light)"
}, i = {
	neutral: "var(--color-text-primary)",
	info: "#00496b",
	success: "#004f21",
	warning: "#864611",
	critical: "#710020"
};
function a({ type: e = "neutral", title: a, subtitle: o, icon: s, actions: c, className: l }) {
	return /* @__PURE__ */ n("div", {
		className: ["flex flex-row items-start gap-4 p-[var(--spacing-large)] rounded-[var(--border-radius-xlarge)]", l ?? ""].join(" "),
		style: { background: r[e] },
		children: [s && /* @__PURE__ */ t("span", {
			className: "shrink-0 inline-flex items-center justify-center size-6",
			children: s
		}), /* @__PURE__ */ n("div", {
			className: "flex flex-col flex-1 gap-2 min-w-0",
			style: { color: i[e] },
			children: [/* @__PURE__ */ n("div", {
				className: "flex flex-col gap-1 leading-[1.5] w-full",
				children: [/* @__PURE__ */ t("p", {
					className: "font-[Archivo] font-semibold text-base w-full",
					children: a
				}), o && /* @__PURE__ */ t("p", {
					className: "font-[Archivo] font-medium text-sm w-full",
					children: o
				})]
			}), c && /* @__PURE__ */ t("div", {
				className: "flex items-start",
				children: c
			})]
		})]
	});
}
//#endregion
//#region src/components/Button/Button.tsx
var o = {
	small: "h-8  px-3 gap-1.5 text-sm",
	medium: "h-10 px-3 gap-2  text-base",
	large: "h-12 px-4 gap-2  text-base",
	xlarge: "h-14 px-5 gap-2  text-xl"
}, s = {
	small: "size-4",
	medium: "size-5",
	large: "size-6",
	xlarge: "size-6"
};
function c(e, t) {
	return t ? e === "secondary" ? "border border-[var(--color-border-high)] cursor-not-allowed" : "cursor-not-allowed" : e === "secondary" ? "border border-[var(--color-border-high)]" : "";
}
function l(e, t) {
	return t ? {
		background: e === "primary" ? "var(--color-interaction-primary-disabled)" : void 0,
		color: "var(--color-text-disabled)"
	} : e === "primary" ? {
		background: "var(--color-interaction-primary-enabled)",
		color: "var(--color-text-contained)"
	} : e === "secondary" ? { color: "var(--color-text-primary)" } : { color: "var(--color-text-branded)" };
}
function u({ variant: e = "primary", size: r = "medium", leftIcon: i, rightIcon: a, fullWidth: u = !1, disabled: d = !1, className: f, style: p, children: m, ...h }) {
	let g = e === "primary", _ = e === "secondary";
	function v(t) {
		if (d) return;
		let n = t.currentTarget;
		g && (n.style.background = "var(--color-interaction-primary-hover)"), _ && (n.style.borderColor = "var(--color-text-primary)"), e === "tertiary" && (n.style.textDecoration = "underline");
	}
	function y(t) {
		if (d) return;
		let n = t.currentTarget;
		g && (n.style.background = "var(--color-interaction-primary-enabled)"), _ && (n.style.borderColor = ""), e === "tertiary" && (n.style.textDecoration = "");
	}
	function b(t) {
		if (d) return;
		let n = t.currentTarget;
		g && (n.style.background = "var(--color-interaction-primary-pressed)"), _ && (n.style.background = "var(--color-base-low)"), e === "tertiary" && (n.style.opacity = "0.75");
	}
	function x(t) {
		if (d) return;
		let n = t.currentTarget;
		g && (n.style.background = "var(--color-interaction-primary-hover)"), _ && (n.style.background = ""), e === "tertiary" && (n.style.opacity = "");
	}
	return /* @__PURE__ */ n("button", {
		disabled: d,
		className: [
			"inline-flex items-center justify-center font-semibold font-[Archivo] transition-colors select-none",
			o[r],
			c(e, !!d),
			u ? "w-full" : "",
			f ?? ""
		].join(" "),
		style: {
			borderRadius: "var(--border-radius-action)",
			...l(e, !!d),
			...p
		},
		onMouseEnter: v,
		onMouseLeave: y,
		onMouseDown: b,
		onMouseUp: x,
		...h,
		children: [
			i && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${s[r]}`,
				children: i
			}),
			/* @__PURE__ */ t("span", {
				className: "truncate",
				children: m
			}),
			a && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${s[r]}`,
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/Icon/Icon.tsx
var d = {
	outlined: "material-symbols-outlined",
	rounded: "material-symbols-rounded",
	sharp: "material-symbols-sharp"
};
function f({ name: e, size: n = 24, fill: r = 0, weight: i = 400, variant: a = "outlined", color: o = "currentColor", className: s }) {
	return /* @__PURE__ */ t("span", {
		className: [d[a], s ?? ""].join(" ").trim(),
		style: {
			fontVariationSettings: `'opsz' ${n}, 'wght' ${i}, 'FILL' ${r}, 'GRAD' 0`,
			fontSize: n,
			lineHeight: 1,
			color: o,
			userSelect: "none",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: 0
		},
		children: e
	});
}
//#endregion
//#region src/components/TrainingCard/TrainingCard.tsx
function p({ coachImage: e, coachName: r, sessionType: i, specialTag: a, date: o, duration: s, music: c, spotsUsed: l, spotsTotal: d, onCheckin: p, onClick: m, className: h }) {
	return /* @__PURE__ */ n("div", {
		className: ["flex items-stretch overflow-hidden cursor-pointer transition-opacity hover:opacity-95", h ?? ""].join(" "),
		style: {
			background: "var(--color-base-lowest)",
			borderRadius: "var(--border-radius-3xlarge)"
		},
		onClick: m,
		children: [/* @__PURE__ */ t("div", {
			className: "shrink-0 overflow-hidden",
			style: {
				width: 200,
				minHeight: 200
			},
			children: /* @__PURE__ */ t("img", {
				src: e || "https://placehold.co/200x200/2A2A2A/fff?text=Coach",
				alt: r,
				className: "w-full h-full object-cover"
			})
		}), /* @__PURE__ */ n("div", {
			className: "flex flex-1 items-center",
			style: {
				gap: "var(--spacing-3xlarge)",
				paddingTop: "var(--spacing-2xlarge)",
				paddingBottom: "var(--spacing-2xlarge)",
				paddingLeft: "var(--spacing-3xlarge)",
				paddingRight: "var(--spacing-8xlarge)"
			},
			children: [
				/* @__PURE__ */ n("div", {
					className: "flex flex-1 flex-col",
					style: { gap: "var(--spacing-small)" },
					children: [
						/* @__PURE__ */ n("div", {
							className: "flex items-center flex-wrap",
							style: { gap: "var(--spacing-xsmall)" },
							children: [
								/* @__PURE__ */ t(f, {
									name: "sports_gymnastics",
									size: 20,
									weight: 300,
									variant: "rounded",
									fill: 0,
									color: "var(--color-text-branded)"
								}),
								/* @__PURE__ */ t("span", {
									className: "font-[Archivo] font-semibold text-sm leading-[1.5]",
									style: { color: "var(--color-text-branded)" },
									children: i
								}),
								a && /* @__PURE__ */ t("span", {
									className: "font-[Archivo] font-semibold text-xs leading-[1.5]",
									style: {
										color: "var(--color-text-branded)",
										background: "color-mix(in srgb, var(--color-brand-primary) 20%, transparent)",
										borderRadius: "var(--border-radius-action)",
										padding: "2px var(--spacing-small)"
									},
									children: a
								})
							]
						}),
						/* @__PURE__ */ t("p", {
							className: "font-[Archivo] font-semibold leading-[1.25]",
							style: {
								fontSize: "var(--typography-h4-600-font-size)",
								color: "var(--color-text-primary)"
							},
							children: r
						}),
						/* @__PURE__ */ n("div", {
							className: "flex flex-col",
							style: { gap: "var(--spacing-small)" },
							children: [
								/* @__PURE__ */ n("div", {
									className: "flex items-center",
									style: { gap: "var(--spacing-small)" },
									children: [/* @__PURE__ */ t(f, {
										name: "calendar_today",
										size: 20,
										weight: 300,
										variant: "rounded",
										fill: 0,
										color: "var(--color-icon-secondary)"
									}), /* @__PURE__ */ t("span", {
										className: "font-[Archivo] font-medium text-sm leading-[1.5]",
										style: { color: "var(--color-text-primary)" },
										children: o
									})]
								}),
								/* @__PURE__ */ n("div", {
									className: "flex items-center",
									style: { gap: "var(--spacing-small)" },
									children: [/* @__PURE__ */ t(f, {
										name: "timer",
										size: 20,
										weight: 300,
										variant: "rounded",
										fill: 0,
										color: "var(--color-icon-secondary)"
									}), /* @__PURE__ */ t("span", {
										className: "font-[Archivo] font-medium text-sm leading-[1.5]",
										style: { color: "var(--color-text-primary)" },
										children: s
									})]
								}),
								c && /* @__PURE__ */ n("div", {
									className: "flex items-center",
									style: { gap: "var(--spacing-small)" },
									children: [/* @__PURE__ */ t(f, {
										name: "play_circle",
										size: 20,
										weight: 300,
										variant: "rounded",
										fill: 0,
										color: "var(--color-icon-secondary)"
									}), /* @__PURE__ */ t("span", {
										className: "font-[Archivo] font-medium text-sm leading-[1.5]",
										style: { color: "var(--color-text-primary)" },
										children: c
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ n("div", {
					className: "flex flex-1 items-center",
					style: { gap: "var(--spacing-medium)" },
					children: [/* @__PURE__ */ t(f, {
						name: "group",
						size: 24,
						weight: 300,
						variant: "rounded",
						fill: 0,
						color: "var(--color-icon-primary)"
					}), /* @__PURE__ */ n("p", {
						className: "font-[Archivo] font-medium leading-[1.25] whitespace-nowrap",
						style: {
							fontSize: "var(--typography-h3-500-font-size)",
							color: "var(--color-text-primary)"
						},
						children: [
							l,
							"/",
							d
						]
					})]
				}),
				/* @__PURE__ */ t("div", {
					className: "flex items-center shrink-0",
					children: /* @__PURE__ */ t(u, {
						size: "xlarge",
						variant: "primary",
						onClick: (e) => {
							e.stopPropagation(), p?.(e);
						},
						children: "Check-in"
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/components/Chip/Chip.tsx
function m(e) {
	return e === "disabled" ? { borderColor: "var(--color-interaction-primary-disabled)" } : e === "selected" ? { borderColor: "var(--color-interaction-primary-enabled)" } : { borderColor: "var(--color-border-high)" };
}
function h(e) {
	return e === "disabled" ? { color: "var(--color-text-disabled)" } : e === "selected" ? { color: "var(--color-text-branded)" } : { color: "var(--color-text-primary)" };
}
function g({ size: e = "medium", state: r = "idle", iconOnly: i = !1, leftIcon: a, rightIcon: o, className: s, style: c, children: l, disabled: u, ...d }) {
	let f = r === "disabled" || u, p = e === "small", g = p ? "size-4" : "size-6", _ = i ? p ? "size-7" : "size-10" : p ? "h-7 px-2 gap-1" : "h-10 px-4 gap-1";
	function v(e) {
		f || (e.currentTarget.style.background = "var(--color-base-lowest)");
	}
	function y(e) {
		f || (e.currentTarget.style.background = "");
	}
	function b(e) {
		f || (e.currentTarget.style.opacity = "0.75");
	}
	function x(e) {
		f || (e.currentTarget.style.opacity = "");
	}
	return /* @__PURE__ */ n("button", {
		disabled: f,
		className: [
			"inline-flex items-center justify-center font-[Archivo] border transition-colors select-none rounded-[var(--border-radius-action)]",
			_,
			p ? "text-sm font-medium" : "text-base font-semibold",
			f ? "cursor-not-allowed" : "cursor-pointer",
			s ?? ""
		].join(" "),
		style: {
			...m(r),
			...h(r),
			...c
		},
		onMouseEnter: v,
		onMouseLeave: y,
		onMouseDown: b,
		onMouseUp: x,
		...d,
		children: [
			!i && a && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${g}`,
				children: a
			}),
			i ? /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${g}`,
				children: a ?? l
			}) : /* @__PURE__ */ t("span", {
				className: "truncate",
				children: l
			}),
			!i && o && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${g}`,
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/Divider/Divider.tsx
function _({ intensity: e = "normal", horizontalSpace: n = !1, verticalSpace: r = !1, className: i }) {
	let a = e === "high" ? "bg-[var(--color-border-high)] border border-[var(--color-border-high)]" : "bg-[var(--color-border-normal)]";
	return r ? /* @__PURE__ */ t("div", {
		className: ["flex flex-col items-start w-full py-[var(--spacing-small)]", i ?? ""].join(" "),
		children: /* @__PURE__ */ t("div", { className: ["h-px w-full shrink-0", a].join(" ") })
	}) : n ? /* @__PURE__ */ t("div", {
		className: ["flex flex-col items-start h-px w-full px-[var(--spacing-large)]", i ?? ""].join(" "),
		children: /* @__PURE__ */ t("div", { className: ["flex-1 min-h-px min-w-px w-full", a].join(" ") })
	}) : /* @__PURE__ */ t("div", {
		className: ["relative h-px w-full", i ?? ""].join(" "),
		children: /* @__PURE__ */ t("div", { className: ["absolute inset-0", a].join(" ") })
	});
}
//#endregion
//#region src/components/InfoCard/InfoCard.tsx
function v(e, t) {
	let n = "flex items-start rounded-[12px]", r = t === "horizontal" ? "flex-row gap-3 p-4" : "flex-col gap-4 px-5 py-4";
	switch (e) {
		case "elevated": return `${n} ${r} bg-white shadow-[0px_2px_16px_0px_rgba(22,22,22,0.12)]`;
		case "outlined": return `${n} ${r} border border-[var(--color-border-high)]`;
		case "filled": return `${n} ${r} bg-[var(--color-base-lowest)]`;
	}
}
function y({ orientation: r = "horizontal", style: i = "outlined", icon: a, eyebrow: o, title: s, description: c, caption: l, actions: u, className: d }) {
	let f = r === "horizontal", p = /* @__PURE__ */ n("div", {
		className: ["flex flex-1 flex-col items-start min-w-0", f ? "pl-1" : ""].join(" "),
		children: [
			o && /* @__PURE__ */ t("p", {
				className: "font-[Archivo] font-semibold text-xs text-[var(--color-text-branded)] leading-[1.5]",
				children: o
			}),
			/* @__PURE__ */ n("div", {
				className: "flex flex-col gap-0.5 items-start pb-1 w-full",
				children: [/* @__PURE__ */ t("p", {
					className: "font-[Archivo] font-semibold text-xl text-[var(--color-text-primary)] leading-[1.5] w-full",
					children: s
				}), c && /* @__PURE__ */ t("p", {
					className: "font-[Archivo] font-medium text-base text-[var(--color-text-secondary)] leading-[1.5] w-full",
					children: c
				})]
			}),
			l && /* @__PURE__ */ t("p", {
				className: "font-[Archivo] font-medium text-xs text-[var(--color-text-disabled)] leading-[1.5] whitespace-nowrap pt-1",
				children: l
			})
		]
	});
	return /* @__PURE__ */ n("div", {
		className: [v(i, r), d ?? ""].join(" "),
		children: [a && /* @__PURE__ */ t("span", {
			className: "size-6 shrink-0",
			children: a
		}), f ? /* @__PURE__ */ n(e, { children: [p, u && /* @__PURE__ */ t("div", {
			className: "flex gap-3 items-start self-stretch shrink-0",
			children: u
		})] }) : /* @__PURE__ */ n("div", {
			className: "flex gap-4 items-start w-full",
			children: [p, u && /* @__PURE__ */ t("div", {
				className: "flex gap-3 items-start shrink-0",
				children: u
			})]
		})]
	});
}
//#endregion
//#region src/components/Link/Link.tsx
var b = {
	small: {
		text: "text-xs",
		icon: "size-5"
	},
	medium: {
		text: "text-sm",
		icon: "size-5"
	},
	large: {
		text: "text-base",
		icon: "size-6"
	}
};
function x({ size: e = "small", weight: r = "semibold", leftIcon: i, rightIcon: a, className: o, style: s, children: c, ...l }) {
	let { text: u, icon: d } = b[e], f = r === "semibold" ? "font-semibold" : "font-medium";
	function p(e) {
		e.currentTarget.style.borderBottomColor = "currentColor";
	}
	function m(e) {
		e.currentTarget.style.borderBottomColor = "transparent";
	}
	function h(e) {
		e.currentTarget.style.opacity = "0.75";
	}
	function g(e) {
		e.currentTarget.style.opacity = "";
	}
	return /* @__PURE__ */ n("a", {
		className: [
			"inline-flex items-center gap-1 font-[Archivo] text-[var(--color-text-branded)] border-b border-transparent transition-colors select-none",
			u,
			f,
			o ?? ""
		].join(" "),
		style: s,
		onMouseEnter: p,
		onMouseLeave: m,
		onMouseDown: h,
		onMouseUp: g,
		...l,
		children: [
			i && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${d}`,
				children: i
			}),
			/* @__PURE__ */ t("span", { children: c }),
			a && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${d}`,
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/ListItem/ListItem.tsx
function S({ size: e = "large", style: r = "plain", title: i, subtitle: a, tertiaryText: o, leftColumn: s, rightItems: c, divider: l = !1, className: u }) {
	let d = e === "small", f = d ? "size-5" : "size-6", p = d ? "gap-[var(--spacing-medium)] p-[var(--spacing-medium)]" : e === "medium" ? "gap-[var(--spacing-large)] px-[var(--spacing-large)] py-[var(--spacing-medium)]" : "gap-[var(--spacing-large)] p-[var(--spacing-large)]", m = d ? "text-sm" : "text-base", h = d ? "text-xs" : "text-sm";
	return /* @__PURE__ */ n("div", {
		className: [
			"flex flex-col items-start w-full",
			r === "contained" ? "border border-[var(--color-border-high)] rounded-[var(--border-radius-large)]" : "",
			u ?? ""
		].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: ["flex items-start w-full", p].join(" "),
			children: [
				s && /* @__PURE__ */ t("div", {
					className: "flex items-start self-stretch shrink-0",
					children: /* @__PURE__ */ t("span", {
						className: `shrink-0 ${f}`,
						children: s
					})
				}),
				/* @__PURE__ */ n("div", {
					className: "flex flex-1 flex-col gap-1 items-start font-[Archivo] font-medium leading-[1.5] min-w-0",
					children: [/* @__PURE__ */ t("p", {
						className: ["text-[var(--color-text-primary)] w-full", m].join(" "),
						children: i
					}), a && /* @__PURE__ */ t("p", {
						className: ["text-[var(--color-text-secondary)] w-full", h].join(" "),
						children: a
					})]
				}),
				(o || c) && /* @__PURE__ */ n("div", {
					className: "flex gap-2 items-center shrink-0",
					children: [o && /* @__PURE__ */ t("span", {
						className: "font-[Archivo] font-medium text-sm text-[var(--color-text-secondary)] whitespace-nowrap",
						children: o
					}), c && /* @__PURE__ */ t("div", {
						className: "flex gap-2 items-center",
						children: c
					})]
				})
			]
		}), r === "plain" && l && /* @__PURE__ */ t("div", { className: "h-px w-full bg-[var(--color-border-high)]" })]
	});
}
//#endregion
//#region src/components/PillButton/PillButton.tsx
var C = {
	small: {
		base: "h-7 text-sm gap-1",
		icon: "size-4",
		iconOnly: "size-7 p-1.5"
	},
	medium: {
		base: "h-10 text-base gap-2",
		icon: "size-6",
		iconOnly: "size-10 p-2"
	}
};
function w(e, t) {
	return t ? e === "primary" ? "cursor-not-allowed" : "border border-[var(--color-border-normal)] cursor-not-allowed" : e === "secondary" ? "border border-[var(--color-border-high)] text-[var(--color-text-primary)]" : "";
}
function T(e, t) {
	return t ? {
		background: e === "primary" ? "var(--color-interaction-primary-disabled)" : void 0,
		color: "var(--color-text-disabled)"
	} : e === "primary" ? {
		background: "var(--color-interaction-primary-enabled)",
		color: "var(--color-text-contained)"
	} : {};
}
function E({ variant: e = "primary", size: r = "medium", iconOnly: i = !1, leftIcon: a, rightIcon: o, disabled: s = !1, className: c, style: l, children: u, ...d }) {
	let f = C[r], p = e === "primary";
	function m(e) {
		!s && p && (e.currentTarget.style.background = "var(--color-interaction-primary-hover)");
	}
	function h(e) {
		!s && p && (e.currentTarget.style.background = "var(--color-interaction-primary-enabled)");
	}
	function g(e) {
		!s && p && (e.currentTarget.style.background = "var(--color-interaction-primary-pressed)");
	}
	function _(e) {
		!s && p && (e.currentTarget.style.background = "var(--color-interaction-primary-hover)");
	}
	return /* @__PURE__ */ n("button", {
		disabled: s,
		className: [
			"inline-flex items-center justify-center font-semibold font-[Archivo] transition-colors select-none rounded-[var(--border-radius-action)]",
			i ? f.iconOnly : `px-3 ${f.base}`,
			w(e, !!s),
			c ?? ""
		].join(" "),
		style: {
			...T(e, !!s),
			...l
		},
		onMouseEnter: m,
		onMouseLeave: h,
		onMouseDown: g,
		onMouseUp: _,
		...d,
		children: [
			!i && a && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${f.icon}`,
				children: a
			}),
			i ? /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${f.icon}`,
				children: a ?? u
			}) : /* @__PURE__ */ t("span", {
				className: "truncate",
				children: u
			}),
			!i && o && /* @__PURE__ */ t("span", {
				className: `shrink-0 inline-flex items-center justify-center ${f.icon}`,
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/SectionHeader/SectionHeader.tsx
function D({ level: e = "one", size: r = "default", title: i, subtitle: a, icon: o, actionLabel: s, onAction: c, className: l }) {
	if (e === "two") {
		let e = r === "small" ? "text-sm" : "text-base";
		return /* @__PURE__ */ t("div", {
			className: ["flex items-start pb-[var(--spacing-medium)] w-full", l ?? ""].join(" "),
			children: /* @__PURE__ */ t("p", {
				className: ["flex-1 font-[Archivo] font-semibold text-[var(--color-text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap", e].join(" "),
				children: i
			})
		});
	}
	let u = r === "default", d = u ? "text-xl" : "text-base", f = u ? "size-6" : "size-5", p = u ? "text-sm" : "text-xs", m = u ? "size-5" : "size-4";
	return /* @__PURE__ */ n("div", {
		className: ["flex items-center gap-[var(--spacing-large)] pb-[var(--spacing-medium)] w-full", l ?? ""].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "flex flex-1 flex-col gap-1 items-start min-w-0",
			children: [/* @__PURE__ */ n("div", {
				className: ["flex items-center gap-[var(--spacing-small)] w-full", u ? "items-start" : "items-center"].join(" "),
				children: [o && /* @__PURE__ */ t("span", {
					className: `shrink-0 inline-flex items-center justify-center ${f}`,
					children: o
				}), /* @__PURE__ */ t("p", {
					className: ["font-[Archivo] font-semibold text-[var(--color-text-primary)] overflow-hidden text-ellipsis whitespace-nowrap", d].join(" "),
					children: i
				})]
			}), u && a && /* @__PURE__ */ t("p", {
				className: "font-[Archivo] font-medium text-sm text-[var(--color-text-secondary)] w-full leading-[1.5]",
				children: a
			})]
		}), s && c && /* @__PURE__ */ n("button", {
			onClick: c,
			className: "inline-flex items-center shrink-0 font-[Archivo] font-semibold text-[var(--color-text-primary)] hover:underline",
			children: [/* @__PURE__ */ t("span", {
				className: p,
				children: s
			}), /* @__PURE__ */ t("span", {
				className: `shrink-0 ${m}`,
				"aria-hidden": !0,
				children: "›"
			})]
		})]
	});
}
//#endregion
//#region src/components/Snackbar/Snackbar.tsx
var O = {
	default: {
		bg: "bg-[var(--color-base-highest)]",
		text: "text-[var(--color-text-inverted)]"
	},
	branded: {
		bg: "bg-[var(--color-base-branded)]",
		text: "text-[var(--color-text-contained)]"
	},
	error: {
		bg: "bg-[var(--color-feedback-error)]",
		text: "text-[var(--color-text-contained)]"
	},
	success: {
		bg: "bg-[var(--color-feedback-success)]",
		text: "text-[var(--color-text-primary)]"
	},
	warning: {
		bg: "bg-[var(--color-feedback-warning)]",
		text: "text-[var(--color-text-primary)]"
	}
};
function k({ type: e = "default", message: r, icon: i, action: a, className: o }) {
	let { bg: s, text: c } = O[e];
	return /* @__PURE__ */ n("div", {
		className: [
			"flex items-center gap-[var(--spacing-large)] p-[var(--spacing-large)] rounded-[var(--border-radius-xlarge)] min-h-14 w-full max-w-[600px]",
			s,
			o ?? ""
		].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "flex flex-1 gap-[var(--spacing-large)] items-center min-w-0",
			children: [i && /* @__PURE__ */ t("span", {
				className: "shrink-0 size-6",
				children: i
			}), /* @__PURE__ */ t("p", {
				className: ["flex-1 font-[Archivo] font-semibold text-base leading-[1.5]", c].join(" "),
				children: r
			})]
		}), a && /* @__PURE__ */ t("div", {
			className: "flex items-start shrink-0",
			children: a
		})]
	});
}
//#endregion
//#region src/components/Tag/Tag.tsx
var A = {
	default: {
		bg: "var(--color-base-low)",
		iconBg: "var(--color-base-low)",
		color: "var(--color-text-primary)"
	},
	branded: {
		bg: "var(--color-feedback-branded-light)",
		iconBg: "var(--color-feedback-branded-light)",
		color: "var(--color-text-branded)"
	},
	info: {
		bg: "var(--color-feedback-info-light)",
		iconBg: "var(--color-feedback-info-light)",
		color: "var(--color-text-information)"
	},
	success: {
		bg: "var(--color-feedback-success-light)",
		iconBg: "var(--color-feedback-success-light)",
		color: "var(--color-text-success)"
	},
	failure: {
		bg: "var(--color-feedback-error-light)",
		iconBg: "var(--color-feedback-error-light)",
		color: "var(--color-text-error)"
	}
};
function j({ type: e = "default", size: r = "regular", icon: i, iconOnly: a = !1, className: o, children: s }) {
	let { bg: c, iconBg: l, color: u } = A[e], d = r === "small", f = d ? "h-5" : "h-6", p = d ? "px-0.5" : "px-1", m = d ? "p-0.5" : "p-1";
	return a && i ? /* @__PURE__ */ t("div", {
		className: ["inline-flex items-center justify-center rounded-[var(--border-radius-small)]", o ?? ""].join(" "),
		style: { background: c },
		children: /* @__PURE__ */ t("span", {
			className: ["inline-flex items-center justify-center rounded-[var(--border-radius-small)]", m].join(" "),
			style: { background: l },
			children: /* @__PURE__ */ t("span", {
				className: "size-4 inline-flex items-center justify-center shrink-0",
				children: i
			})
		})
	}) : /* @__PURE__ */ n("div", {
		className: [
			"inline-flex items-center gap-0.5 rounded-[var(--border-radius-small)]",
			f,
			p,
			o ?? ""
		].join(" "),
		style: {
			background: c,
			color: u
		},
		children: [i && /* @__PURE__ */ t("span", {
			className: "size-4 inline-flex items-center justify-center shrink-0",
			children: i
		}), /* @__PURE__ */ t("span", {
			className: "inline-flex items-center justify-center px-1 font-[Archivo] font-medium text-[10px] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap",
			children: s
		})]
	});
}
//#endregion
//#region src/assets/logos/KardiaIsotipo.tsx
function M({ size: e, width: r, height: i, ...a }) {
	return /* @__PURE__ */ n("svg", {
		viewBox: "0 0 177.96 202.2",
		xmlns: "http://www.w3.org/2000/svg",
		width: e ?? r ?? 177.96,
		height: e ?? i ?? 202.2,
		...a,
		children: [/* @__PURE__ */ t("polygon", {
			fill: "currentColor",
			points: "138.29 202.2 177.96 202.2 158.38 101.1 118.74 101.1 138.32 0 98.65 0 79.07 101.1 118.72 101.1 138.29 202.2"
		}), /* @__PURE__ */ t("polygon", {
			fill: "currentColor",
			points: "0 0 0 202.2 19.83 202.2 59.5 202.2 79.07 101.1 39.67 101.1 39.67 0 0 0"
		})]
	});
}
//#endregion
//#region src/assets/logos/KardiaImagotipo.tsx
function N({ size: e, width: r, height: i, ...a }) {
	return /* @__PURE__ */ n("svg", {
		viewBox: "0 0 1031.57 154.37",
		xmlns: "http://www.w3.org/2000/svg",
		width: e ?? r ?? 1031.57,
		height: e ?? i ?? 154.37,
		...a,
		children: [/* @__PURE__ */ t("path", {
			fill: "currentColor",
			d: "M0,1.94v150.48c0,1.07.87,1.94,1.94,1.94h150.48c1.07,0,1.94-.87,1.94-1.94V1.94c0-1.07-.87-1.94-1.94-1.94H1.94C.87,0,0,.87,0,1.94ZM104.72,137.79l-11.69-60.36h-23.67l-11.69,60.36H22.15V17.07h23.68v60.36h23.53l11.69-60.36h23.68l-11.69,60.36h23.67l11.69,60.36h-23.68Z"
		}), /* @__PURE__ */ n("g", { children: [
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M419.88,0h-35.29c-.83,0-1.57.53-1.84,1.32l-51.85,151.7-.47,1.36h21.09c.83,0,1.57-.53,1.84-1.32l18.98-55.7c.27-.79,1.01-1.32,1.84-1.32h54.5c.83,0,1.58.53,1.84,1.32l18.77,55.69c.27.79,1.01,1.32,1.84,1.32h18.59c1.33,0,2.27-1.31,1.84-2.57L420.12.7l-.24-.7ZM420.84,77.13h-39.02c-1.33,0-2.27-1.31-1.84-2.57l19.6-57.55c.6-1.76,3.09-1.76,3.68,0l19.42,57.55c.43,1.26-.51,2.57-1.84,2.57Z"
			}),
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M591.31,80.15h-4.85c14.09-5.87,21.22-18.43,21.22-37.43,0-21.13-7.18-42.73-60.44-42.73h-55.47c-1.07,0-1.94.87-1.94,1.94v150.48c0,1.07.87,1.94,1.94,1.94h17.83c1.07,0,1.94-.87,1.94-1.94v-56.39c0-1.07.87-1.94,1.94-1.94h70.97c1.07,0,1.94.87,1.94,1.94v56.39c0,1.07.87,1.94,1.94,1.94h17.61c1.07,0,1.94-.87,1.94-1.94v-55.26c0-11.29-5.58-17.02-16.58-17.02ZM586.18,47.05c0,26.18-15.42,28.14-38.94,28.14h-33.76c-1.07,0-1.94-.87-1.94-1.94V20.85c0-1.07.87-1.94,1.94-1.94h33.76c24.23,0,38.94,1.89,38.94,28.14Z"
			}),
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M739.41,13.68c-12.57-9.33-29.49-13.68-53.27-13.68h-48.13c-1.07,0-1.94.87-1.94,1.94v150.48c0,1.07.87,1.94,1.94,1.94h48.13c33.55,0,78.16-8.01,78.16-77.3,0-30.23-8.14-50.96-24.88-63.39ZM742.57,77.07c0,53.88-29.13,58.39-56.44,58.39h-26.41c-1.07,0-1.94-.87-1.94-1.94V20.85c0-1.07.87-1.94,1.94-1.94h26.41c27.31,0,56.44,4.49,56.44,58.17Z"
			}),
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M781.66,18.91h30.24c1.07,0,1.94.87,1.94,1.94v112.67c0,1.07-.87,1.94-1.94,1.94h-30.24c-1.07,0-1.94.87-1.94,1.94v15.02c0,1.07.87,1.94,1.94,1.94h85.88c1.07,0,1.94-.87,1.94-1.94v-15.02c0-1.07-.87-1.94-1.94-1.94h-30.25c-1.07,0-1.94-.87-1.94-1.94V20.85c0-1.07.87-1.94,1.94-1.94h30.25c1.07,0,1.94-.87,1.94-1.94V1.94c0-1.07-.87-1.94-1.94-1.94h-85.88c-1.07,0-1.94.87-1.94,1.94v15.02c0,1.07.87,1.94,1.94,1.94Z"
			}),
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M980.03.7l-.24-.7h-35.29c-.83,0-1.57.53-1.84,1.32l-51.85,151.7-.47,1.36h21.09c.83,0,1.57-.53,1.84-1.32l18.98-55.7c.27-.79,1.01-1.32,1.84-1.32h54.5c.83,0,1.58.53,1.84,1.32l18.77,55.69c.27.79,1.01,1.32,1.84,1.32h18.59c1.33,0,2.27-1.31,1.84-2.57L980.03.7ZM980.75,77.13h-39.02c-1.33,0-2.27-1.31-1.84-2.57l19.6-57.55c.6-1.76,3.09-1.76,3.68,0l19.42,57.55c.43,1.26-.51,2.57-1.84,2.57Z"
			}),
			/* @__PURE__ */ t("path", {
				fill: "currentColor",
				d: "M291.17,31.07l15.51-16.21,11.07-11.57C318.93,2.05,318.05,0,316.34,0h-22.1c-.53,0-1.03.21-1.4.59l-3.69,3.82-15.09,15.6-44.66,46.16h0s-8.37,9.27-9.45,8.2c-.25-.33-.47-.68-.47-1.12V1.94C219.48.87,218.61,0,217.54,0h-17.83c-1.07,0-1.94.87-1.94,1.94v150.48c0,1.07.87,1.94,1.94,1.94h17.83c1.07,0,1.94-.87,1.94-1.94v-54.14c0-1.25,1.01-2.26,2.26-2.26h70.66c1.07,0,1.94.87,1.94,1.94v54.45c0,1.07.87,1.94,1.94,1.94h17.61c1.07,0,1.95-.87,1.95-1.95v-55.25c0-11.29-5.58-20.04-16.58-20.04h-50c-.85,0-1.28-1.02-.7-1.63l42.61-44.43Z"
			})
		] })]
	});
}
//#endregion
export { a as Alert, u as Button, g as Chip, _ as Divider, f as Icon, y as InfoCard, N as KardiaImagotipo, M as KardiaIsotipo, x as Link, S as ListItem, E as PillButton, D as SectionHeader, k as Snackbar, j as Tag, p as TrainingCard };
