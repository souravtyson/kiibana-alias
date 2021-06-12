const request = {
    logInsertionRate: "/log_insertion_count?days=",
    networkTraffic: "/nwtraffic?days=",
    ips_severity_table_count: "/ips_severity_table_count?days=",
    srcip: "/srcip/top_ten?days=",
    destip: "/destip/top_ten?days=",
    threatSeverityMetric: "/threat_by_severity_count?days=",
    top_ten_category_by_severity_types: "/top_ten_category_by_severity_types?days=",
	top_user_with_config_access: "/top_user_with_config_access?days=",
	threats_by_severity_bar: "/threats_by_severity_bar?days=",
	unique_users_with_config_access: "/unique_users_with_config_access?days=",
	administrative_activity: "/administrative_activity?days="
}

export default request