describe('Versioning', function () {
  it('3.1 should be greater than 3.0', function() {
    expect(Versioning.compare("3.1", "3.0") > 0).toBeTruthy();
  });
  it('3.1 should be equal than 3.1', function() {
    expect(Versioning.compare("3.1", "3.1") == 0).toBeTruthy();
  });
  it('3.1 should be equal than 3.1.0', function() {
    expect(Versioning.compare("3.1", "3.1.0") == 0).toBeTruthy();
  });
  it('3.1 should be equal than 3.1.0', function() {
    expect(Versioning.compare("3.1", "3.1.0") == 0).toBeTruthy();
  });
  it('3.0.1 should be less than 3.0.2', function() {
    expect(Versioning.compare("3.0.1", "3.0.2") < 0).toBeTruthy();
  });
  it('3.0 should be equal to 3.0a', function() {
    expect(Versioning.compare("3.0", "3.0a") == 0).toBeTruthy();
  });
  it('"" should be less than 1.0', function() {
    expect(Versioning.compare("", "1.0") < 0).toBeTruthy();
  });
  it('" " should be less than 1.0', function() {
    expect(Versioning.compare(" ", "1.0") < 0).toBeTruthy();
  });
  it('null should be less than 1.0', function() {
    expect(Versioning.compare(null, "1.0") < 0).toBeTruthy();
  });
  it('3.0 should be equal to 3.0.0.0.0.0.0.0.0', function() {
    expect(Versioning.compare("3.0", "3.0.0.0.0.0.0.0.0") == 0).toBeTruthy();
  });
  it('3.0 should be less than 3.0.0.0.0.0.0.0.0.1', function() {
    expect(Versioning.compare("3.0", "3.0.0.0.0.0.0.0.0.1") < 0).toBeTruthy();
  });
  it('3.0.1.0 should be equal to 3.0.1.0.0.0.0', function() {
    expect(Versioning.compare("3.0.1.0", "3.0.1.0.0.0.0") == 0).toBeTruthy();
  });
});

describe('Versioning Major', function () {
  it('3.1 should be equal for Major to 3.0', function() {
    expect(Versioning.compareMajor("3.1", "3.0") == 0).toBeTruthy();
  });
  it('3.1 should be equal for Major to 3.0.1', function() {
    expect(Versioning.compareMajor("3.1", "3.0.1") == 0).toBeTruthy();
  });
  it('3.1 should be less than Major of 4.0', function() {
    expect(Versioning.compareMajor("3.1", "4.0") < 0).toBeTruthy();
  });
  it('4.1.1 should be greater than Major of 3.1', function() {
    expect(Versioning.compareMajor("4.1.1", "3.1") > 0).toBeTruthy();
  });
});

describe('Versioning Minor', function () {
  it('1.1.1 should be equal for Minor to 1.1.2', function() {
    expect(Versioning.compareMinor("1.1.1", "1.1.2") == 0).toBeTruthy();
  });
  it('1.1.1 should be less than Minor to 1.2.0', function() {
    expect(Versioning.compareMinor("1.1.1", "1.2.0") < 0).toBeTruthy();
  });
});

describe('Versioning Revision', function () {
  it('1.1.1 should be equal to revision of 1.1.1', function() {
    expect(Versioning.compareRevision("1.1.1", "1.1.1") == 0).toBeTruthy();
  });
  it('1.1.1 should be equal to revision of 1.1.1.0', function() {
    expect(Versioning.compareRevision("1.1.1", "1.1.1.0") == 0).toBeTruthy();
  });
  it('1.1.1 should be less than revision of 1.1.2', function() {
    expect(Versioning.compareRevision("1.1.1", "1.1.2") < 0).toBeTruthy();
  });
});