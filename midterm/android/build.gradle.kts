// Thêm buildscript để khai báo classpath cho plugin
buildscript {
    val kotlinVersion = "2.1.0"
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        // Khai báo classpath cho plugin google-services
        classpath("com.google.gms:google-services:4.4.2") // Phiên bản mới nhất tính đến tháng 4/2025
        classpath("com.android.tools.build:gradle:8.1.0")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory = rootProject.layout.buildDirectory.dir("../../build").get()
rootProject.layout.buildDirectory.set(newBuildDir) // Sử dụng .set() thay vì .value() để tương thích với Gradle mới

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.set(newSubprojectBuildDir) // Sử dụng .set() thay vì .value()
}

subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}