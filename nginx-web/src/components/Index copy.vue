<!-- <template>
    <v-container>
        <div id="container"> </div>
1111
    </v-container>
</template>

<script>
    import * as THREE from 'three'
    export default {

        data() {
            return {
                camera: null, //相机对象
                scene: null, //场景对象
                renderer: null, //渲染器对象
                mesh: null, //网格模型对象Mesh
                lon: 90, //把鼠标在屏幕上的横偏移量作为旋转角度的基准
                lat: 0, //把鼠标在屏幕上的纵偏移量作为旋转角度的基准
                phi: 0, //相机的横平面到Y轴的弧度
                theta: 0, //相机的竖平面到X轴的弧度

                startX: null,
                STARTy: null,
                startLon: null,
                startLat: null

            };
        },
        mounted() {
            setTimeout(() => {
                this.init()
                // this.animate()
            })

        },
        methods: {
            init() {
                // 初始化

                // 场景
                this.scene = new THREE.Scene();
                // 摄像机参数（视角大小，  最大宽度高度，最小距离px，最远距离px）
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
                this.camera.position.z = 20;
                // 渲染器
                this.renderer = new THREE.WebGLRenderer();
                // 设置渲染的区域大小
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                //  设置图片清晰度
                this.renderer.setPixelRatio(window.devicePixelRatio);
                let container = document.getElementById('container')
                container.appendChild(this.renderer.domElement);
                this.createMesh()
                container.addEventListener('touchstart', this.start, false);
                container.addEventListener('touchmove', this.move, false);

            },
            createMesh() {
                var baseUrl = '../images/'

                // arr顺序按 左右 上下 前后
                var arr = [
                    // 放每一张图片
                    this.loadTexture(baseUrl + '5.jpg'),
                    this.loadTexture(baseUrl + '3.jpg'),
                    this.loadTexture(baseUrl + '2.jpg'),
                    this.loadTexture(baseUrl + '1.jpg'),
                    this.loadTexture(baseUrl + '6.jpg'),
                    this.loadTexture(baseUrl + '4.jpg'),
                ];

                var geometry = new THREE.BoxGeometry(300, 300, 300);
                
                // var material = new THREE.MultiMaterial(arr); //因为每一个面要贴不同的图片，传arr
                var material =arr; //因为每一个面要贴不同的图片，传arr
                console.log(arr)
                this.mesh = new THREE.Mesh(geometry, material);
                this.mesh.geometry.scale(1, 1, -1); //让盒子里外翻面
                // mesh.scale.x = -1;//让盒子里外翻面
                this.scene.add(this.mesh) //把造好的网格放入场景scene
                 this.renderer.render(this.scene, this.camera)
            },
            loadTexture(url) {

                // 负责把图片做成相应的材料,url图片地址
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load(url) //图片组成的纹理
                texture.needsUpdate = true; //纹理更新后使用新纹理
                var basicMaterial = new THREE.MeshBasicMaterial({
                    map: texture
                });
                return basicMaterial //这个就是由图片创造的一个面的材料

            },
            // update() {
            //     var target = new THREE.Vector3(); //做一个三维项链，相机看向的那个方向
            //     this.lon += 0.1;
            //     this.lat = Math.max(-85, Math.min(85, this.lat));
            //     this.phi = THREE.Math.degToRad(90 - this.lat);
            //     this.theta = THREE.Math.degToRad(this.lon);
            //     target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
            //     target.y = 500 * Math.cos(this.phi);
            //     target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
            //     this.camera.lookAt(target)
            //     this.renderer.render(this.scene, this.camera)

            // },
            // animate() {
            //     requestAnimationFrame(this.animate);
            //     this.update()
            // },
            // start(e) {
            //     // console.log(e)
            //     this.startX = e.touches[0].pageX;
            //     this.startY = e.touches[0].pageY;
            //     this.startLon = this.lon;
            //     this.startLat = this.lat;
            // },
            // move(e) {
            //     // console.log(e)
            //     this.lon = (this.startX - e.touches[0].this.pageX) * 0.2 + this.startLon;
            //     this.lat = (e.touches[0].this.pageY - this.startY) * 0.2 + this.startLat;
            //     this.update()
            // }
        },
        THREE
    };
</script>
<style>
.container{
    height: 100vh;
    width: 100vh;
}


</style> -->