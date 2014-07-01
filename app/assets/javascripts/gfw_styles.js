var gfwStyles = '\
#gfw2_layerstyles_v4 {\
polygon-fill: #FF6600  ;\
polygon-opacity: 0.7;\
line-width: 0.2;\
line-opacity: 0.6;\
\
[zoom>3] {\
line-width: 0.3;\
line-opacity: 0.7;\
line-clip: false;\
polygon-clip: false;\
}\
\
[zoom>5] {\
line-width: 0.4;\
line-clip: false;\
}\
\
[zoom>6] {\
line-width: 0.6;\
line-opacity: 0.8;\
line-clip: false;\
}\
\
[zoom>7] {\
line-width: 0.8;\
line-clip: false;\
}\
\
[zoom>8] {\
line-width: 1;\
line-opacity: 1;\
line-clip: false;\
}\
\
[name=\'logging_all_merged\'] {\
polygon-fill: #fecc5c  ;\
line-color: #B38E3B  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'gfw2_drc_conc\'] {\
polygon-fill: #EC7014  ;\
line-color: #EC7014  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'mining_permits_merge\'] {\
polygon-fill: #fd8d3c  ;\
line-color: #fd8d3c  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'oil_palm_permits_merge\'] {\
polygon-fill: #ee9587  ;\
line-color: #ee9587  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'caf_lc_1\'] {\
polygon-fill: #fe9929  ;\
line-color: #fe9929  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'idn_tc_1\'] {\
polygon-fill: #BDBDBD  ;\
line-color: #BDBDBD  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'world_ifl\'] {\
polygon-fill: #BBD973  ;\
line-color: #BBD973  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'fiber_all_merged\'] {\
polygon-fill: #e6adb9  ;\
line-color: #e6adb9  ;\
line-clip: false;\
polygon-clip: false;\
}\
\
[name=\'forma_extent\'] {\
polygon-fill: #f69;\
polygon-opacity: 0.3;\
line-width: 1;\
line-color: #FFF;\
line-opacity: 0;\
}\
\
[name=\'modis_forest_change_copy\'] {\
marker-fill: black;\
marker-opacity: 0.9;\
marker-allow-overlap: true;\
marker-placement: point;\
marker-type: ellipse;\
marker-width: 3;\
}\
\
[name=\'biodiversity_hotspots\'] {\
polygon-fill: #49A39A  ;\
line-color: #49A39A  ;\
polygon-clip: false;\
polygon-opacity: 0.5;\
line-clip: false;\
polygon-clip: false;\
line-width: 0.6;\
line-opacity: 0.8;\
}\
\
[name=\'quicc_bounding_box_extent\'] {\
polygon-fill: #f69;\
polygon-opacity: 0.3;\
line-width: 0;\
line-color: #FFF;\
line-opacity: 1;\
}\
\
[name=\'imazon_sad_geografic_extent\'] {\
polygon-fill: #f69;\
polygon-opacity: 0.3;\
line-width: 0;\
line-color: #FFF;\
line-opacity: 1;\
}\
\
[name=\'cameroon_communityforests\'] {\
polygon-fill: #707d92  ;\
polygon-opacity: 0.9;\
line-width: 0;\
line-color: #FFF;\
line-opacity: 1;\
}\
}\
';