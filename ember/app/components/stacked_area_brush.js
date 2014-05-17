import StackedAreaGraphComponent from "timinator/components/stacked_area_graph";
import BrushMixin from "timinator/mixins/context-brush";

export default StackedAreaGraphComponent.extend(BrushMixin, {
	yTicks: 0,

	setupGraph: function(){
		this._super();
		this.setupBrush();
	}.on("didInsertElement")
});