function Location($locationProvider){
    $locationProvider.html5Mode(true);
}
Location.$inject = ['$locationProvider'];
export default Location;