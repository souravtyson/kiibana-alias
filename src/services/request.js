const request = {
    logInsertionRate : "/log_insertion_count?days=",
    networkTraffic : "/nwtraffic?days=",
    table : "/table?days=",
    srcip : "/srcip/top_ten?days=",
	destip : "/destip/top_ten?days=",
	threatSeverityMetric : "/threat_by_severity_count?days=",
	top_ten_category_by_severity_types : "/top_ten_category_by_severity_types?days=",
    bar : "/bar?days="
}

export default request